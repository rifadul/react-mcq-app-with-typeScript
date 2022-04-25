import React, {  useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { Card, CardContent, Button } from '@mui/material';
import Loader from '../img/loader.svg';
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Container,
} from '@mui/material';
import quizData from '../data/quiz.json';
// type Props = {
//     type: string;
//     question: string;
//     choices: string[];
//     answer: string;
//     callback: any;
//     userAnswer: [];
//     questionNo: number;
//     totalQuestions: number;
// };

export type AnswerObject = {
    question: string;
    userAnswer: string;
    correctAnswer: string;
    score: number;
};

export const QuestionsCard: React.FC = () => {
    const { prelang } = useParams();
    var score = 0;
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('');
    const [questions, setQuestions] = useState(quizData.react);
    const [currentQuestionNo, setCurrentQuestionNo] = useState(0);
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
    const [result, setResult] = useState(false);
    let navigate = useNavigate();

    const nextQustion = () => {
        setCurrentQuestionNo(currentQuestionNo + 1);
    };
    const showResult = () => {
        setResult(true);
        navigate(`/result`, { state: userAnswers });
    };

    const getAnswer = (answer: any) => {
        const question = questions[0].mcqData[currentQuestionNo].question;
        const correctAnswer = questions[0].mcqData[currentQuestionNo].answer;
        const userAnswer = answer;
        if (correctAnswer === userAnswer) {
            score = 10;
        }
        const answerObject = {
            question,
            userAnswer,
            correctAnswer,
            score,
        };
        console.log('sd', userAnswers, answerObject.question);

        if (userAnswers.length > 0) {

            if (userAnswers[userAnswers.length - 1].question === question) {
                userAnswers.splice(-1);
            }
            setUserAnswers((prev) => [...prev, answerObject]);
        } else {
            setUserAnswers((prev) => [...prev, answerObject]);
        }
        setSelected(answer);
    };



    return (
        <div>
            {loading ? (
                <div>
                    <img src={Loader} alt="Loading..." />
                </div>
            ) : !result ? (
                <Container
                    maxWidth="sm"
                    sx={{ mt: 10 }}
                    data-testid="home-component">
                    <Card sx={{ maxWidth: 1000 }}>
                        <CardHeader
                            title="MCQ Qustions"
                            style={{
                                textAlign: 'center',
                                backgroundColor: '#03a9f4',
                                color: 'white',
                            }}
                        />
                        <CardContent>
                            <div>
                                <h1 style={{ fontSize: '22px' }}>
                                    {
                                        questions[0].mcqData[currentQuestionNo]
                                            .question
                                    }
                                </h1>
                                {questions[0].mcqData[
                                    currentQuestionNo
                                ].choices.map((option, index) => {
                                    return (
                                        <div
                                            style={{
                                                fontSize: '18px',
                                                padding: '10px',
                                                margin: '16px',
                                                backgroundColor: '#edf7f7',
                                            }}
                                            className={
                                                selected === option
                                                    ? 'selected answer'
                                                    : 'answer'
                                            }
                                            key={index}
                                            onClick={(e) => getAnswer(option)}>
                                            <p>
                                                {index + 1}. {option}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>

                            <div>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    style={{ float: 'right' }}
                                    onClick={
                                        questions[0].mcqData.length ===
                                        currentQuestionNo + 1
                                            ? showResult
                                            : nextQustion
                                    }>
                                    {questions[0].mcqData.length ===
                                    currentQuestionNo + 1
                                        ? 'Show Result'
                                        : 'Next Qustion'}
                                </Button>
                                <Button variant="outlined">Reset</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            ) : (
                'Show'
            )}
        </div>
    );
};
