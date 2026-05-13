/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import AppLayout from './components/layout/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Calculator = lazy(() => import('./pages/Calculator'));
const ProductClassification = lazy(() => import('./pages/ProductClassification'));
const MonitoringCenter = lazy(() => import('./pages/MonitoringCenter'));
const AuditHistory = lazy(() => import('./pages/AuditHistory'));
const CheckpointManagement = lazy(() => import('./pages/CheckpointManagement'));
const AIFraudDetection = lazy(() => import('./pages/AIFraudDetection'));
const Financial = lazy(() => import('./pages/Financial'));
const Documents = lazy(() => import('./pages/Documents'));
const Login = lazy(() => import('./pages/auth/Login'));
const AdminPanel = lazy(() => import('./pages/admin/AdminPanel'));

const LoadingFallback = () => <div className="p-6">Loading...</div>;

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <AppLayout />,
    children: [
        { index: true, element: <Dashboard /> },
        { path: 'calculator', element: <Calculator /> },
        { path: 'products', element: <ProductClassification /> },
        { path: 'monitoring', element: <MonitoringCenter /> },
        { path: 'audit', element: <AuditHistory /> },
        { path: 'checkpoints', element: <CheckpointManagement /> },
        { path: 'ai-fraud', element: <AIFraudDetection /> },
        { path: 'admin', element: <AdminPanel /> },
        { path: 'financial', element: <Financial /> },
        { path: 'documents', element: <Documents /> },
    ]
  }
]);

export default function App() {
  return (
    <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <RouterProvider router={router} />
        </Suspense>
    </ErrorBoundary>
  );
}
