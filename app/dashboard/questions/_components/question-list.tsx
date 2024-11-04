"use client";

import { Answer, Book, Question, User } from "@prisma/client";
import { MessageCircleReply, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useQuestionDelete, useQuestionReply } from "@/hooks/use-question";

interface QuestionWithRelations extends Question {
    book: Book;
    answers: Answer[];
    user: User;
}

interface QuestionListProps {
    questions: QuestionWithRelations[];
}

export const QuestionList = ({ questions }: QuestionListProps) => {
    const { onOpen } = useQuestionReply();
    const { onOpen: onOpenDelete } = useQuestionDelete();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Question</TableHead>
                    <TableHead>Answers</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {questions.map((question) => (
                    <TableRow key={question.id}>
                        <TableCell>{question.user.name}</TableCell>
                        <TableCell>{question.book.name}</TableCell>
                        <TableCell>{question.question}</TableCell>
                        <TableCell>{question.answers.length}</TableCell>
                        <TableCell className="flex justify-center">
                            <Button variant="ghost" size="icon" onClick={() => onOpen(question.id)}>
                                <MessageCircleReply className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => onOpenDelete(question.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}