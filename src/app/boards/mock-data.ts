import { Board, Column, Task, SubTask } from '../interfaces';

export const boards: Board[] = [
  {
    id: '1',
    name: 'Platform Launch',
    columns: [],
  },
  {
    id: '2',
    name: 'Marketing Plan',
    columns: [],
  },
  {
    id: '3',
    name: 'Roadmap',
    columns: [],
  },
];

export const columns: Column[] = [
  {
    id: '1',
    boardId: '1',
    name: 'Todo',
    tasks: [],
  },
  {
    id: '2',
    boardId: '1',
    name: 'Doing',
    tasks: [],
  },
  {
    id: '3',
    boardId: '1',
    name: 'Done',
    tasks: [],
  },

  {
    id: '4',
    boardId: '2',
    name: 'Todo',
    tasks: [],
  },
  {
    id: '5',
    boardId: '2',
    name: 'Doing',
    tasks: [],
  },
  {
    id: '6',
    boardId: '2',
    name: 'Done',
    tasks: [],
  },

  {
    id: '7',
    boardId: '3',
    name: 'Now',
    tasks: [],
  },
  {
    id: '8',
    boardId: '3',
    name: 'Next',
    tasks: [],
  },
  {
    id: '9',
    boardId: '3',
    name: 'Later',
    tasks: [],
  },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Build UI for onboarding flow',
    description: '',
    status: 'Todo',
    subtasks: [],
  },
  {
    id: '2',
    title: 'Build UI for search',
    description: '',
    status: 'Todo',
    subtasks: [],
  },
  {
    id: '3',
    title: 'Build settings UI',
    description: '',
    status: 'Todo',
    subtasks: [],
  },
  {
    id: '4',
    title: 'QA and test all major user journeys',
    description:
      'Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.',
    status: 'Todo',
    subtasks: [],
  },

  {
    id: '5',
    title: 'Design settings and search pages',
    description: '',
    status: 'Doing',
    subtasks: [],
  },
  {
    id: '6',
    title: 'Add account management endpoints',
    description: '',
    status: 'Doing',
    subtasks: [],
  },
  {
    id: '7',
    title: 'Design onboarding flow',
    description: '',
    status: 'Doing',
    subtasks: [],
  },
  {
    id: '8',
    title: 'Add search enpoints',
    description: '',
    status: 'Doing',
    subtasks: [],
  },
  {
    id: '9',
    title: 'Add authentication endpoints',
    description: '',
    status: 'Doing',
    subtasks: [],
  },
  {
    id: '10',
    title:
      'Research pricing points of various competitors and trial different business models',
    description:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
    status: 'Doing',
    subtasks: [],
  },

  {
    id: '11',
    title: 'Conduct 5 wireframe tests',
    description:
      'Ensure the layout continues to make sense and we have strong buy-in from potential users.',
    status: 'Done',
    subtasks: [],
  },
  {
    id: '12',
    title: 'Create wireframe prototype',
    description:
      'Create a greyscale clickable wireframe prototype to test our asssumptions so far.',
    status: 'Done',
    subtasks: [],
  },
  {
    id: '13',
    title: 'Review results of usability tests and iterate',
    description:
      "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
    status: 'Done',
    subtasks: [],
  },
  {
    id: '14',
    title:
      'Create paper prototypes and conduct 10 usability tests with potential customers',
    description: '',
    status: 'Done',
    subtasks: [],
  },
  {
    id: '15',
    title: 'Market discovery',
    description:
      'We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.',
    status: 'Done',
    subtasks: [],
  },
  {
    id: '16',
    title: 'Competitor analysis',
    description: '',
    status: 'Done',
    subtasks: [],
  },
  {
    id: '17',
    title: 'Research the market',
    description:
      'We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.',
    status: 'Done',
    subtasks: [],
  },

  {
    id: '18',
    title: 'Plan Product Hunt launch',
    description: '',
    status: 'Todo',
    subtasks: [],
  },
  {
    id: '19',
    title: 'Share on Show HN',
    description: '',
    status: '',
    subtasks: [],
  },
  {
    id: '20',
    title: 'Write launch article to publish on multiple channels',
    description: '',
    status: '',
    subtasks: [],
  },

  {
    id: '21',
    title: 'Launch version one',
    description: '',
    status: '',
    subtasks: [],
  },
  {
    id: '22',
    title: 'Review early feedback and plan next steps for roadmap',
    description:
      "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
    status: '',
    subtasks: [],
  },
];

export const subtasks: SubTask[] = [
  {
    id: '1',
    taskId: '1',
    title: 'Sign up page',
    isCompleted: true,
  },
  {
    id: '2',
    taskId: '1',
    title: 'Sign in page',
    isCompleted: false,
  },
  {
    id: '3',
    taskId: '1',
    title: 'Welcome page',
    isCompleted: false,
  },
  {
    id: '4',
    taskId: '2',
    title: 'Search page',
    isCompleted: false,
  },
  {
    id: '5',
    taskId: '3',
    title: 'Account page',
    isCompleted: false,
  },
  {
    id: '6',
    taskId: '3',
    title: 'Billing page',
    isCompleted: false,
  },
  {
    id: '7',
    taskId: '4',
    title: 'Internal testing',
    isCompleted: false,
  },
  {
    id: '8',
    taskId: '4',
    title: 'External testing',
    isCompleted: false,
  },
  {
    id: '9',
    taskId: '5',
    title: 'Settings - Account page',
    isCompleted: true,
  },
  {
    id: '10',
    taskId: '5',
    title: 'Settings - Billing page',
    isCompleted: true,
  },
  {
    id: '11',
    taskId: '5',
    title: 'Search page',
    isCompleted: false,
  },
  {
    id: '12',
    taskId: '6',
    title: 'Upgrade plan',
    isCompleted: true,
  },
  {
    id: '13',
    taskId: '6',
    title: 'Cancel plan',
    isCompleted: true,
  },
  {
    id: '14',
    taskId: '6',
    title: 'Update payment method',
    isCompleted: false,
  },
  {
    id: '15',
    taskId: '7',
    title: 'Sign up page',
    isCompleted: true,
  },
  {
    id: '16',
    taskId: '7',
    title: 'Sign in page',
    isCompleted: false,
  },
  {
    id: '17',
    taskId: '7',
    title: 'Welcome page',
    isCompleted: false,
  },
  {
    id: '18',
    taskId: '8',
    title: 'Add search endpoint',
    isCompleted: true,
  },
  {
    id: '19',
    taskId: '8',
    title: 'Define search filters',
    isCompleted: false,
  },
  {
    id: '20',
    taskId: '9',
    title: 'Define user model',
    isCompleted: true,
  },
  {
    id: '21',
    taskId: '9',
    title: 'Add auth endpoints',
    isCompleted: false,
  },
  {
    id: '22',
    taskId: '10',
    title: 'Research competitor pricing and business models',
    isCompleted: true,
  },
  {
    id: '23',
    taskId: '10',
    title: 'Outline a business model that works for our solution',
    isCompleted: false,
  },
  {
    id: '24',
    taskId: '10',
    title:
      'Talk to potential customers about our proposed solution and ask for fair price expectancy',
    isCompleted: false,
  },
  {
    id: '25',
    taskId: '11',
    title: 'Complete 5 wireframe prototype tests',
    isCompleted: true,
  },
  {
    id: '26',
    taskId: '12',
    title: 'Create clickable wireframe prototype in Balsamiq',
    isCompleted: true,
  },
  {
    id: '27',
    taskId: '13',
    title: 'Meet to review notes from previous tests and plan changes',
    isCompleted: true,
  },
  {
    id: '28',
    taskId: '13',
    title: 'Make changes to paper prototypes',
    isCompleted: true,
  },
  {
    id: '29',
    taskId: '13',
    title: 'Conduct 5 usability tests',
    isCompleted: true,
  },
  {
    id: '30',
    taskId: '14',
    title: 'Create paper prototypes for version one',
    isCompleted: true,
  },
  {
    id: '31',
    taskId: '14',
    title: 'Complete 10 usability tests',
    isCompleted: true,
  },
  {
    id: '32',
    taskId: '15',
    title: 'Interview 10 prospective customers',
    isCompleted: true,
  },
  {
    id: '33',
    taskId: '16',
    title: 'Find direct and indirect competitors',
    isCompleted: true,
  },
  {
    id: '34',
    taskId: '16',
    title: 'SWOT analysis for each competitor',
    isCompleted: true,
  },
  {
    id: '35',
    taskId: '17',
    title: 'Write up research analysis',
    isCompleted: true,
  },
  {
    id: '36',
    taskId: '17',
    title: 'Calculate TAM',
    isCompleted: true,
  },
  {
    id: '37',
    taskId: '18',
    title: 'Find hunter',
    isCompleted: false,
  },
  {
    id: '38',
    taskId: '18',
    title: 'Gather assets',
    isCompleted: false,
  },
  {
    id: '39',
    taskId: '18',
    title: 'Draft product page',
    isCompleted: false,
  },
  {
    id: '40',
    taskId: '18',
    title: 'Notify customers',
    isCompleted: false,
  },
  {
    id: '41',
    taskId: '18',
    title: 'Notify network',
    isCompleted: false,
  },
  {
    id: '42',
    taskId: '18',
    title: 'Launch!',
    isCompleted: false,
  },
  {
    id: '43',
    taskId: '19',
    title: 'Draft out HN post',
    isCompleted: false,
  },
  {
    id: '44',
    taskId: '19',
    title: 'Get feedback and refine',
    isCompleted: false,
  },
  {
    id: '45',
    taskId: '19',
    title: 'Publish post',
    isCompleted: false,
  },
  {
    id: '46',
    taskId: '20',
    title: 'Write article',
    isCompleted: false,
  },
  {
    id: '47',
    taskId: '20',
    title: 'Publish on LinkedIn',
    isCompleted: false,
  },
  {
    id: '48',
    taskId: '20',
    title: 'Publish on Inndie Hackers',
    isCompleted: false,
  },
  {
    id: '49',
    taskId: '20',
    title: 'Publish on Medium',
    isCompleted: false,
  },
  {
    id: '50',
    taskId: '21',
    title: 'Launch privately to our waitlist',
    isCompleted: false,
  },
  {
    id: '51',
    taskId: '21',
    title: 'Launch publicly on PH, HN, etc.',
    isCompleted: false,
  },
  {
    id: '52',
    taskId: '22',
    title: 'Interview 10 customers',
    isCompleted: false,
  },
  {
    id: '53',
    taskId: '22',
    title: 'Review common customer pain points and suggestions',
    isCompleted: false,
  },
  {
    id: '54',
    taskId: '22',
    title: 'Outline next steps for our roadmap',
    isCompleted: false,
  },
];
