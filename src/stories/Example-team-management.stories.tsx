import { TeamManagementExample } from '../examples/team-management/Example';

export default { title: 'Examples/Team Management' };

export const MembersAndInvitations = () => <TeamManagementExample />;
export const PendingInvitations = () => <TeamManagementExample initialTab="invitations" />;
export const NoPendingInvitations = () => <TeamManagementExample initialTab="invitations" noInvitations />;
