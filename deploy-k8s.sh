#!/bin/bash

# Stop on first error
set -e

NAMESPACE="user-management"
K8S_DIR="./k8s"

echo "🚀 Starting Kubernetes deployment for namespace: $NAMESPACE"

# 1️⃣ Create namespace if not exists
if ! kubectl get namespace $NAMESPACE >/dev/null 2>&1; then
  echo "🆕 Creating namespace: $NAMESPACE"
  kubectl apply -f $K8S_DIR/namespace.yaml
else
  echo "✅ Namespace $NAMESPACE already exists"
fi

# 2️⃣ Apply DB and dependencies first
echo "📦 Deploying MySQL..."
kubectl apply -f $K8S_DIR/mysql.yaml

echo "⏳ Waiting for MySQL to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/mysql -n $NAMESPACE || {
  echo "❌ MySQL did not become ready in time!"
  exit 1
}

echo "📦 Deploying Elasticsearch..."
kubectl apply -f $K8S_DIR/elasticsearch.yaml

echo "⏳ Waiting for Elasticsearch to be ready..."
kubectl wait --for=condition=available --timeout=120s deployment/elasticsearch -n $NAMESPACE || {
  echo "❌ Elasticsearch did not become ready in time!"
  exit 1
}

echo "📦 Deploying Kibana..."
kubectl apply -f $K8S_DIR/kibana.yaml

# 3️⃣ Deploy Flyway migrations (one-time job)
# echo "📜 Running Flyway migrations..."
# kubectl delete job flyway-migrate -n $NAMESPACE --ignore-not-found
# kubectl apply -f $K8S_DIR/flyway.yaml
# kubectl wait --for=condition=complete --timeout=120s job/flyway-migrate -n $NAMESPACE || {
#   echo "⚠️ Flyway migration did not complete successfully!"
# }

# 4️⃣ Deploy Application
echo "🚀 Deploying Node.js app..."
kubectl apply -f $K8S_DIR/app.yaml

echo "⏳ Waiting for application to be ready..."
kubectl wait --for=condition=available --timeout=180s deployment/user-app -n $NAMESPACE || {
  echo "❌ Application failed to start!"
  exit 1
}

# 5️⃣ Apply ingress if exists
if [ -f "$K8S_DIR/ingress.yaml" ]; then
  echo "🌐 Applying Ingress..."
  kubectl apply -f $K8S_DIR/ingress.yaml
else
  echo "⚠️ No ingress.yaml found — skipping ingress setup"
fi

# 6️⃣ Show deployment summary
echo "🔍 Checking resources..."
kubectl get pods -n $NAMESPACE
kubectl get svc -n $NAMESPACE

echo "✅ All components deployed successfully! 🎉"
