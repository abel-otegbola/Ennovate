export interface User {
    id: string;
    email: string;
    username: string;
    fullname: string;
    bio: string;
    avatar: string;
    discipline: string[];
    expertise: string[];
    interests: string[];
    socialLinks: {
        twitter?: string;
        linkedin?: string;
        github?: string;
    };
    role: 'user' | 'company' | 'moderator' | 'admin';
    verified: boolean;
}

export const emptyUserProfile: Omit<User, 'id' | 'email' | 'fullname' | 'avatar' | 'verified'> = {
    username: '',
    bio: '',
    discipline: [],
    expertise: [],
    interests: [],
    socialLinks: {},
    role: 'user',
};