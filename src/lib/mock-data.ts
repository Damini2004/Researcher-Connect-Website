// This file contains mock data for the application.

export const journals = [
  { id: 'jit', name: 'Journal of Innovative Technology' },
  { id: 'acs', name: 'Annals of Computer Science' },
  { id: 'ges', name: 'Global Environmental Studies' },
  { id: 'gmb', name: 'Genetics & Molecular Biology Review' },
  { id: 'jnm', name: 'Journal of Nanomedicine' },
  { id: 'mp', name: 'Mind & Philosophy' },
];

export const allSubmissions = [
  {
    id: 'S001',
    title: 'The Future of AI in Academic Research',
    author: 'Dr. Eva Rostova',
    status: 'Done',
    subAdmin: 'Dr. Alisha Gupta',
    date: '2023-10-26',
    imageSrc: 'https://placehold.co/400x300.png',
    imageHint: 'abstract shapes',
    journal: 'Journal of Innovative Technology'
  },
  {
    id: 'S002',
    title: "Quantum Computing's Impact on Cryptography",
    author: 'Dr. Samuel Greene',
    status: 'In Progress',
    subAdmin: 'Dr. Alisha Gupta',
    date: '2023-11-05',
    imageSrc: 'https://placehold.co/400x300.png',
    imageHint: 'quantum computer',
    journal: 'Annals of Computer Science'
  },
  {
    id: 'S003',
    title: 'A Meta-Analysis of Climate Change Models',
    author: 'Dr. Chloe Bennette',
    status: 'Done',
    subAdmin: 'Dr. Chloe Davis',
    date: '2023-11-15',
    imageSrc: 'https://placehold.co/400x300.png',
    imageHint: 'earth climate',
    journal: 'Global Environmental Studies'
  },
  {
    id: 'S004',
    title: 'Advances in Gene-Editing with CRISPR-Cas9',
    author: 'Dr. Maria Rodriguez',
    status: 'Canceled',
    subAdmin: 'Dr. Chloe Davis',
    date: '2023-11-20',
    imageSrc: 'https://placehold.co/400x300.png',
    imageHint: 'dna helix',
    journal: 'Genetics & Molecular Biology Review'
  },
  {
    id: 'S005',
    title: 'New Economic Theories for a Digital World',
    author: 'Dr. John Smith',
    status: 'Verification Pending',
    subAdmin: 'Unassigned',
    date: '2023-12-01',
    imageSrc: 'https://placehold.co/400x300.png',
    imageHint: 'digital world',
    journal: 'Journal of Innovative Technology'
  },
  {
    id: 'S006',
    title: 'The Philosophy of Consciousness',
    author: 'Dr. Alistair Finch',
    status: 'Done',
    subAdmin: 'Dr. Alisha Gupta',
    date: '2023-09-10',
    imageSrc: 'https://placehold.co/400x300.png',
    imageHint: 'brain neurons',
    journal: 'Mind & Philosophy'
  },
];
