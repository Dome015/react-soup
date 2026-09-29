import { ProjectWorkspaceExample } from '../examples/project-workspace/Example';

export default { title: 'Examples/Project Workspace' };

export const FullDirectory = () => <ProjectWorkspaceExample />;
export const NoProjectsYet = () => <ProjectWorkspaceExample initialView="empty" />;
export const NoFilterMatches = () => <ProjectWorkspaceExample initialView="no-results" />;
