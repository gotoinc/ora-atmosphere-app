import axios from '@/api/axios.api.ts';
import { useThrowError } from '@/hooks/useThrowError.ts';
import type { Group } from '@/ts/catalog';

export const getGroupTopics = async (groupId: string) => {
    try {
        const res = await axios.get<Group>(`/groups/${groupId}/`);

        return res.data.topics;
    } catch (err) {
        useThrowError(err);
    }
};
