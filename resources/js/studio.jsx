import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './bootstrap';

import { StudioBoostEventPage } from './studio/pages/boost-event-page';
import { StudioCreateEventPage } from './studio/pages/create-event-page';
import { StudioDashboardPage } from './studio/pages/dashboard-page';
import { StudioOrganizerProfilePage } from './studio/pages/organizer-profile-page';
import { StudioPaymentConfigurationPage } from './studio/pages/payment-configuration-page';
import { StudioPlanningPage } from './studio/pages/planning-page';
import { StudioScheduleWindowPage } from './studio/pages/schedule-window-page';
import { StudioSocialMediaManagementPage } from './studio/pages/social-media-management-page';
import { StudioSocialPreviewPage } from './studio/pages/social-preview-page';

const { StrictMode } = React;

const pageMap = {
    dashboard: StudioDashboardPage,
    'create-event': StudioCreateEventPage,
    'boost-event': StudioBoostEventPage,
    'schedule-window': StudioScheduleWindowPage,
    'social-media-management': StudioSocialMediaManagementPage,
    'social-preview': StudioSocialPreviewPage,
    planning: StudioPlanningPage,
    'payment-configuration': StudioPaymentConfigurationPage,
    'organizer-profile': StudioOrganizerProfilePage,
};

const rootElement = document.getElementById('ayoyok-studio-root');

if (rootElement) {
    const pageKey = rootElement.dataset.page || 'dashboard';
    const PageComponent = pageMap[pageKey] || StudioDashboardPage;
    const root = createRoot(rootElement);

    root.render(
        <StrictMode>
            <PageComponent />
        </StrictMode>,
    );
}
