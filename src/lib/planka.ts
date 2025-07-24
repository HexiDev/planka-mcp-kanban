// General type for board creation (excluding IDs)
export type PlankaBoardCreate = {
	position: number;
	name: string;
	defaultView?: string;
	defaultCardType?: string;
	limitCardTypesToDefaultOne?: boolean;
	alwaysDisplayCardCreator?: boolean;
};

// General type for label creation (excluding IDs)
export type PlankaLabelCreate = {
	position: number;
	name: string;
	color: PlankaColor;
	type?: string;
};

// General type for list creation (excluding IDs)
export type PlankaListCreate = {
	position: number;
	name: string;
	color?: PlankaColor;
	type?: string;
};
// General type for card creation (excluding IDs)
export type PlankaCardCreate = {
	position: number;
	name: string;
	type?: string;
	description?: string | null;
	dueDate?: string | null;
	isDueDateCompleted?: boolean;
	stopwatch?: string | null;
	labels?: string[];
	coverAttachmentId?: string | null;
};
// General type for card updates
export type PlankaCardUpdate = {
	name?: string;
	description?: string | null;
	dueDate?: string | null;
	isDueDateCompleted?: boolean;
	stopwatch?: string | null;
};
// Type definitions for Planka API responses
export const plankaGradients = [
	'old-lime',
	'ocean-dive',
	'tzepesch-style',
	'jungle-mesh',
	'strawberry-dust',
	'purple-rose',
	'sun-scream',
	'warm-rust',
	'sky-change',
	'green-eyes',
	'blue-xchange',
	'blood-orange',
	'sour-peel',
	'green-ninja',
	'algae-green',
	'coral-reef',
	'steel-grey',
	'heat-waves',
	'velvet-lounge',
	'purple-rain',
	'blue-steel',
	'blueish-curve',
	'prism-light',
	'green-mist',
	'red-curtain'
];
export const plankaColors =
	['berry-red',
		'pumpkin-orange',
		'lagoon-blue',
		'pink-tulip',
		'light-mud',
		'orange-peel',
		'bright-moss',
		'antique-blue',
		'dark-granite',
		'sunny-grass',
		'morning-sky',
		'light-orange',
		'midnight-blue',
		'tank-green',
		'gun-metal',
		'wet-moss',
		'red-burgundy',
		'light-concrete',
		'apricot-red',
		'desert-sand',
		'navy-blue',
		'egg-yellow',
		'coral-green',
		'light-cocoa'];
export type PlankaColor = typeof plankaColors[number];
export type PlankaGradients = typeof plankaGradients[number];

export interface PlankaList {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	type: string;
	position: number | null;
	name: string | null;
	color: PlankaColor | null;
	boardId: string;
}
// Type for getBoardById response
export interface PlankaGetBoardByIdResponse {
	item: PlankaBoard & { isSubscribed?: boolean };
	included: {
		boardMemberships: PlankaBoardMembership[];
		labels: Array<{
			id: string;
			createdAt: string;
			updatedAt: string | null;
			position: number;
			name: string;
			color: string;
			boardId: string;
		}>;
		lists: PlankaList[];
		cards: Array<{
			id: string;
			createdAt: string;
			updatedAt: string | null;
			type: string;
			position: number;
			name: string;
			description: string | null;
			dueDate: string | null;
			stopwatch: string | null;
			commentsTotal: number;
			listChangedAt: string;
			boardId: string;
			listId: string;
			creatorUserId: string;
			prevListId: string | null;
			coverAttachmentId: string | null;
			isSubscribed: boolean;
		}>;
		cardMemberships: Array<{
			id: string;
			createdAt: string;
			updatedAt: string | null;
			cardId: string;
			userId: string;
		}>;
		cardLabels: Array<{
			id: string;
			createdAt: string;
			updatedAt: string | null;
			cardId: string;
			labelId: string;
		}>;
		taskLists: any[];
		tasks: any[];
		customFieldGroups: any[];
		customFields: any[];
		customFieldValues: any[];
		users: Array<PlankaUser & {
			avatar?: {
				url: string;
				thumbnailUrls: {
					cover180: string;
				};
			} | null;
		}>;
		projects: PlankaProject[];
		attachments: any[];
	};
}
export interface PlankaProject {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	name: string;
	description: string | null;
	backgroundType: string;
	backgroundGradient: string | null;
	isHidden: boolean;
	ownerProjectManagerId: string;
	backgroundImageId: string | null;
	isFavorite: boolean;
}

export interface PlankaProjectManager {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	projectId: string;
	userId: string;
}

export interface PlankaBoard {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	position: number;
	name: string;
	defaultView: string;
	defaultCardType: string;
	limitCardTypesToDefaultOne: boolean;
	alwaysDisplayCardCreator: boolean;
	projectId: string;
}

export interface PlankaBoardMembership {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	role: string;
	canComment: boolean | null;
	projectId: string;
	boardId: string;
	userId: string;
}

export interface PlankaUser {
	id: string;
	createdAt: string;
	updatedAt: string | null;
	email: string;
	role: string;
	name: string;
	username: string;
	phone: string | null;
	organization: string | null;
	language: string | null;
	subscribeToOwnCards: boolean;
	subscribeToCardWhenCommenting: boolean;
	turnOffRecentCardHighlighting: boolean;
	enableFavoritesByDefault: boolean;
	defaultEditorMode: string;
	defaultHomeView: string;
	defaultProjectsOrder: string;
	isSsoUser: boolean;
	isDeactivated: boolean;
	avatar: string | null;
	isDefaultAdmin: boolean;
	lockedFieldNames: string[];
}

export interface PlankaIncluded {
	projectManagers: PlankaProjectManager[];
	baseCustomFieldGroups: any[];
	boards: PlankaBoard[];
	boardMemberships: PlankaBoardMembership[];
	customFields: any[];
	notificationServices: any[];
	users: PlankaUser[];
	backgroundImages: any[];
}

export interface PlankaGetProjectByIdResponse {
	item: PlankaProject;
	included: PlankaIncluded;
}

export interface PlankaGetProjectsResponse {
	items: PlankaProject[];
	included: PlankaIncluded;
}

export class Planka {
	emailOrUsername: string;
	password: string;
	baseUrl: string;
	authKey: string | null;
	lastUpdatedProjects: Date | null = null;
	selectedProject: PlankaGetProjectByIdResponse | null = null;

	private constructor(emailOrUsername: string, password: string, baseUrl: string, authKey: string | null) {
		this.emailOrUsername = emailOrUsername;
		this.password = password;
		this.baseUrl = baseUrl;
		this.authKey = authKey;
	}
	private async getProject(projectId?: string): Promise<PlankaGetProjectByIdResponse | null> {
		if (projectId) {
			const project = await this.getProjectById(projectId);
			if (!project) throw new Error(`Project with ID ${projectId} not found`);
			this.selectedProject = project;
			this.lastUpdatedProjects = new Date();
			return project;
		}
		if (!this.selectedProject) {
			throw new Error("No project selected. Use selectProject(projectId) to select a project or provide projectId.");
		}
		// if (this.lastUpdatedProjects && (new Date().getTime() - this.lastUpdatedProjects.getTime() > 5 * 60 * 1000)) {
		this.selectedProject = await this.getProjectById(this.selectedProject.item.id);
		this.lastUpdatedProjects = new Date();
		// }
		return this.selectedProject;
	}
	private async plankaFetch(url: string, options: RequestInit): Promise<any> {
		try {
			// Add Bearer token if available
			options.headers = options.headers || {};
			if (this.authKey) {
				(options.headers as Record<string, string>)["Authorization"] = `Bearer ${this.authKey}`;
			}
			const response = await fetch(url, options);
			const responseJson = await response.json();
			if (responseJson.code && responseJson.message) {
				console.error(`Planka API Error: ${responseJson.message}`);
				throw new Error(responseJson.message + "\nProblems: " + JSON.stringify(responseJson.problems || []));
			}
			if (responseJson.code) {
				console.error(`Planka API Error: ${responseJson.code}`);
			}
			return responseJson;
		} catch (err) {
			console.error('Planka fetch failed:', err);
			throw err;
		}
	}

	static async init(emailOrUsername: string, password: string, baseUrl: string): Promise<Planka> {
		// Use a temporary instance to call plankaFetch for auth
		const tempPlanka = new Planka(emailOrUsername, password, baseUrl, null);
		const responseJson = await tempPlanka.plankaFetch(
			`${baseUrl}/access-tokens`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ emailOrUsername, password })
			}
		);
		const authKey = responseJson.item || null;
		return new Planka(emailOrUsername, password, baseUrl, authKey);
	}


	// Simple update functions
	async moveCardToList(cardId: string, newListId: string): Promise<any> {
		// Only update listId
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/cards/${cardId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ listId: newListId, position: 1 })
			}
		);
		return responseJson.item;
	}

	async renameList(listId: string, newName: string): Promise<PlankaList> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/lists/${listId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: newName })
			}
		);
		return responseJson.item as PlankaList;
	}
	async archiveList(listId: string): Promise<PlankaList> {
		// Set type to 'archive'
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/lists/${listId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ type: 'archive' })
			}
		);
		return responseJson.item as PlankaList;
	}

	async renameCard(cardId: string, newName: string): Promise<any> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/cards/${cardId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: newName })
			}
		);
		return responseJson.item;
	}

	async updateCardDescription(cardId: string, description: string): Promise<any> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/cards/${cardId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ description })
			}
		);
		return responseJson.item;
	}

	async renameBoard(boardId: string, newName: string): Promise<PlankaBoard> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/boards/${boardId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: newName })
			}
		);
		return responseJson.item as PlankaBoard;
	}

	async renameLabel(labelId: string, newName: string): Promise<any> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/labels/${labelId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name: newName })
			}
		);
		return responseJson.item;
	}

	async changeLabelColor(labelId: string, newColor: PlankaColor): Promise<any> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/labels/${labelId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ color: newColor })
			}
		);
		return responseJson.item;
	}
	// Project-related methods
	async getProjects(): Promise<PlankaGetProjectsResponse> {
		// get {{baseurl}}/projects for all projects 
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/projects`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		return responseJson as PlankaGetProjectsResponse;
	}
	async getProjectById(projectId: string): Promise<PlankaGetProjectByIdResponse | null> {
		// get {{baseurl}}/projects/{projectId} for a specific project
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/projects/${projectId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
			}
		);
		if (!responseJson.item) return null;
		return responseJson as PlankaGetProjectByIdResponse;
	}
	async selectProject(projectId: string) {
		const project = await this.getProjectById(projectId);
		if (!project) {
			throw new Error(`Project with ID ${projectId} not found`);
		}
		this.selectedProject = project;
		this.lastUpdatedProjects = new Date();
		return this.selectedProject;
	}
	async changeProjectBackgroundGradient(projectId: string, gradient: string): Promise<PlankaProject> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/projects/${projectId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					backgroundType: "gradient",
					backgroundGradient: gradient
				})
			}
		);
		return responseJson.item as PlankaProject;
	}

	// Board-related methods
	async getBoards(projectId?: string): Promise<PlankaBoard[]> {
		const project = await this.getProject(projectId);
		return project?.included.boards.filter(board => board.projectId === project.item.id) || [];
	}
	async createBoard(projectId: string, board: PlankaBoardCreate): Promise<PlankaBoard> {
		if (!projectId && !this.selectedProject) {
			throw new Error("No project selected. Use selectProject(projectId) to select a project or provide projectId.");
		}
		if (!projectId) {
			projectId = this.selectedProject?.item.id!;
		}
		// Remove null/undefined values
		Object.keys(board).forEach(key => {
			if ((board as any)[key] === null || (board as any)[key] === undefined) {
				delete (board as any)[key];
			}
		});
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/projects/${projectId}/boards`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(board)
			}
		);
		if (!responseJson.item) {
			throw new Error('Failed to create board');
		}
		return responseJson.item as PlankaBoard;
	}
	async getBoardById(boardId: string): Promise<PlankaGetBoardByIdResponse> {
		const board = this.plankaFetch(
			`${this.baseUrl}/boards/${boardId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		if (!board) {
			throw new Error(`Board with ID ${boardId} not found`);
		}
		return board as unknown as PlankaGetBoardByIdResponse;
	}
	async updateBoard(boardId: string, updates: Partial<PlankaBoard>, projectId?: string): Promise<PlankaBoard | null> {
		const project = await this.getProject(projectId);
		const board = project?.included.boards.find(b => b.id === boardId);
		if (!board) {
			throw new Error(`Board with ID ${boardId} not found`);
		}
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/boards/${boardId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			}
		);
		return responseJson.item as PlankaBoard;
	}
	async deleteBoard(boardId: string, projectId?: string): Promise<void> {
		const project = await this.getProject(projectId);
		const board = project?.included.boards.find(b => b.id === boardId);
		if (!board) {
			throw new Error(`Board with ID ${boardId} not found`);
		}
		await this.plankaFetch(
			`${this.baseUrl}/boards/${boardId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		// Remove from local cache
		if (project) {
			project.included.boards = project.included.boards.filter(b => b.id !== boardId);
			if (!projectId) {
				this.selectedProject = project;
				this.lastUpdatedProjects = new Date();
			}
		}
	}

	// Label-related methods
	async getLabelsForBoard(boardId: string): Promise<PlankaGetBoardByIdResponse["included"]["labels"]> {
		const board = await this.getBoardById(boardId);

		return board.included.labels.filter(label => label.boardId === boardId) || [];
	}

	async createLabel(boardId: string, label: PlankaLabelCreate): Promise<any> {
		// Default type if not provided
		if (!label.type) {
			label.type = 'label';
		}
		// Remove null/undefined values
		Object.keys(label).forEach(key => {
			if ((label as any)[key] === null || (label as any)[key] === undefined) {
				delete (label as any)[key];
			}
		});
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/boards/${boardId}/labels`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(label)
			}
		);
		return responseJson.item;
	}

	async updateLabel(labelId: string, updates: Partial<{ name: string; color: PlankaColor; position: number }>): Promise<{ id: string; name?: string; color?: PlankaColor; position?: number } | null> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/labels/${labelId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			}
		);
		return responseJson.item as { id: string; name?: string; color?: PlankaColor; position?: number };
	}

	async deleteLabel(labelId: string): Promise<void> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/labels/${labelId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return responseJson;
	}
	async assignLabelToCard(cardId: string, labelId: string): Promise<any> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/cards/${cardId}/card-labels`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ labelId })
			}
		);
		console.log(`Assigned label ${labelId} to card ${cardId}`);
		return responseJson.item;
	}

	// List-related methods
	async getLists(boardId: string, projectId?: string): Promise<PlankaList[]> {
		const project = await this.getProject(projectId);
		const board = project?.included.boards.find(b => b.id === boardId);
		if (!board) {
			throw new Error(`Board with ID ${boardId} not found`);
		}
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/boards/${boardId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
		return (responseJson.included.lists as PlankaList[])
			.filter(list => list.boardId === boardId && list.type !== 'trash' && list.type !== 'archive') || [];
	}
	async createList(boardId: string, list: PlankaListCreate, projectId?: string): Promise<PlankaList> {
		const project = await this.getProject(projectId);
		const board = project?.included.boards.find(b => b.id === boardId);
		if (!board) {
			throw new Error(`Board with ID ${boardId} not found`);
		}
		// Default type if not provided
		if (!list.type) {
			list.type = 'active';
		}
		// Remove null/undefined values
		Object.keys(list).forEach(key => {
			if ((list as any)[key] === null || (list as any)[key] === undefined) {
				delete (list as any)[key];
			}
		});
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/boards/${boardId}/lists`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(list)
			}
		);
		if (!responseJson.item) {
			throw new Error('Failed to create list');
		}
		return responseJson.item as PlankaList;
	}
	async changeListColor(listId: string, color: PlankaColor): Promise<PlankaList> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/lists/${listId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ color })
			}
		);
		if (!responseJson.item) {
			throw new Error('Failed to change list color');
		}
		return responseJson.item as PlankaList;
	}
	async updateList(listId: string, updates: Partial<PlankaList>): Promise<PlankaList | null> {
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/lists/${listId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			}
		);
		return responseJson.item as PlankaList;
	}

	// Card-related methods
	async getCards(boardId: string, listId?: string) {
		const board = await this.getBoardById(boardId);
		const cards = board.included.cards.filter(card => card.boardId === boardId);
		if (listId) {
			return cards.filter(card => card.listId === listId);
		}
		return cards;
	}
	async deleteCard(cardId: string): Promise<void> {
		await this.plankaFetch(
			`${this.baseUrl}/cards/${cardId}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	}
	async createCard(listId: string, card: PlankaCardCreate): Promise<any> {
		// Convert dueDate to ISO string if present
		if (card.dueDate) {
			card.dueDate = new Date(card.dueDate).toISOString();
		}
		// Default type if not provided
		if (!card.type) {
			card.type = 'project';
		}
		// Remove null/undefined values
		Object.keys(card).forEach(key => {
			if ((card as any)[key] === null || (card as any)[key] === undefined) {
				delete (card as any)[key];
			}
		});
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/lists/${listId}/cards`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(card)
			}
		);
		return responseJson.item;
	}

	async updateCard(cardId: string, updates: Partial<PlankaCardUpdate>): Promise<any> {
		// If dueDate is present, convert to ISO string
		if (updates.dueDate) {
			updates.dueDate = new Date(updates.dueDate).toISOString();
		}
		const responseJson = await this.plankaFetch(
			`${this.baseUrl}/cards/${cardId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(updates)
			}
		);
		return responseJson.item;
	}

}