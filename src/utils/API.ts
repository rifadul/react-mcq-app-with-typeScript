import React from 'react';

export type Questions = {
    category: string;
    correct_answer: string;
    dificulty : string;
    incorrect_answer: string[];
    questions: string;
    type: string;
}
