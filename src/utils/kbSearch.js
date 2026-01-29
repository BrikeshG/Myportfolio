import knowledgeBase from '../data/portfolioKB.json';

export const searchKB = (query) => {
    const lowerQuery = query.toLowerCase();

    // Enhanced synonyms to map user intent to KB keys
    const synonyms = {
        'tech stack': 'skills',
        'technologies': 'skills',
        'tech': 'skills',
        'languages': 'skills', // context dependent, but usually skills
        'coding': 'skills',
        'programming': 'skills',
        'built': 'projects',
        'apps': 'projects',
        'applications': 'projects',
        'repository': 'projects',
        'github': 'contact',
        'mail': 'contact',
        'email': 'contact',
        'hire': 'availability',
        'hiring': 'availability',
        'open': 'availability',
        'bio': 'about',
        'story': 'about',
        'hosting': 'deployment',
        'cloud': 'aws_project',
        'degree': 'education',
        'university': 'education',
        'studied': 'education',
        'certificates': 'certifications',
        'certified': 'certifications',
        'medical': 'healthcare_chatbot',
        'symptom': 'healthcare_chatbot',
        'booking': 'bus_booking',
        'testing': 'bus_booking',
        'speak': 'languages',
        'english': 'languages',
        'german': 'languages',
        'malayalam': 'languages',
        'tamil': 'languages',
        'soft skills': 'skills',
        'relocate': 'location',
        'move': 'location',
        'living': 'location',
        'live': 'location',
        'fun': 'hobbies',
        'hobby': 'hobbies',
        'cricket': 'hobbies',
        'download': 'resume_dl',
        'pdf': 'resume_dl',
        'creator': 'meta_bot',
        'who': 'meta_bot',
        'made': 'meta_bot',
        'pitch': 'why_hire_me',
        'why': 'why_hire_me',
        'soft': 'working_style',
        'culture': 'working_style',
        'summary': 'fast_facts',
        'tldr': 'fast_facts',
        'facts': 'fast_facts'
    };

    let bestMatch = null;
    let maxScore = 0;

    // Search through KB categories
    Object.entries(knowledgeBase).forEach(([category, data]) => {
        let score = 0;

        // Check keywords with weighted scoring
        data.keywords.forEach(keyword => {
            // Exact match gets higher score
            if (lowerQuery === keyword) {
                score += 5;
            }
            // Word boundary match (whole word)
            else if (new RegExp(`\\b${keyword}\\b`, 'i').test(lowerQuery)) {
                score += 3;
            }
            // Partial match
            else if (lowerQuery.includes(keyword)) {
                score += 1;
            }
        });

        // Boost score if the category name itself is in query
        if (lowerQuery.includes(category.replace('_', ' '))) {
            score += 4;
        }

        // Check synonyms
        Object.entries(synonyms).forEach(([synonym, targetCategory]) => {
            if (lowerQuery.includes(synonym) && category === targetCategory) {
                score += 2;
            }
        });

        if (score > maxScore) {
            maxScore = score;
            bestMatch = data;
        }
    });

    // Threshold for a valid answer
    if (maxScore > 0 && bestMatch) {
        return bestMatch.response;
    }

    // Fallback responses
    return null;
};

export const getQuickQuestions = () => [
    "Are you open to work?",
    "What is your tech stack?",
    "Tell me about your projects",
    "How can I contact you?"
];
