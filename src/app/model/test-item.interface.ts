import { Image } from './image.interface';
import { AnswerState } from 'app/model/answer-state.enum';

export interface TestItem {
    id: string;
    go: boolean;
    image: Image;
    answer: AnswerState;
}
