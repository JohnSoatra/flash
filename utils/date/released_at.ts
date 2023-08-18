import { ReleasedAt } from "@/typings";

function releasedDate(releasedAt: ReleasedAt): Date {
    switch(releasedAt) {
        case 'Last hour': return new Date(Date.now() - (1000 * 60 * 60));
        case 'Yesterday': return new Date(Date.now() - (1000 * 60 * 60 * 24));
        case 'Last week': return new Date(Date.now() - (1000 * 60 * 60 * 24 * 7));
        case 'Last month': return new Date(Date.now() - (1000 * 60 * 60 * 24 * 30));
        case 'Last year': return new Date(Date.now() - (1000 * 60 * 60 * 24 * 30 * 12));
    }
}

export default releasedDate;