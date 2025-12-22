import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useQuestions } from "../hooks/useQuestions";
import { useAnswers } from "../hooks/useAnswers";
import { useMatching } from "../hooks/useMatching";

export default function TestHooksPage() {
  const { user } = useAuth();

  // Hooks
  const {
    questions,
    loading: loadingQ,
    error: errorQ,
    createQuestion,
  } = useQuestions();

  const {
    answers,
    loading: loadingA,
    error: errorA,
    createAnswer,
  } = useAnswers();

  const {
    matches,
    loading: loadingM,
    error: errorM,
    findMatches,
  } = useMatching();

  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // Test: Create a question after login
  useEffect(() => {
    if (!user) return;

    const testCreateQuestion = async () => {
      try {
        const id = await createQuestion({
          title: "Test Question",
          description: "This is a test",
          tags: ["test"],
          status: "open",
          views: 0,
          upvotes: 0,
        });
        console.log("Question created:", id);
        setSelectedQuestionId(id);
      } catch (err) {
        console.error(err);
      }
    };

    testCreateQuestion();
  }, [user]);

  // Test: Create an answer for selected question
  useEffect(() => {
    if (!user || !selectedQuestionId) return;

    const testCreateAnswer = async () => {
      try {
        const id = await createAnswer(selectedQuestionId, "This is a test answer");
        console.log("Answer created:", id);
      } catch (err) {
        console.error(err);
      }
    };

    testCreateAnswer();
  }, [user, selectedQuestionId]);

  // Test: Fetch matches
  useEffect(() => {
    if (!user) return;
    const fetchMatches = async () => {
      try {
        const result = await findMatches(user.uid, 5);
        console.log("Matched peers:", result);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMatches();
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h1>Test Hooks</h1>

      <h2>Questions</h2>
      {loadingQ ? <p>Loading...</p> : null}
      {errorQ ? <p style={{ color: "red" }}>{errorQ}</p> : null}
      <ul>
        {questions?.map((q) => (
          <li key={q.id}>{q.title}</li>
        ))}
      </ul>

      <h2>Answers</h2>
      {loadingA ? <p>Loading...</p> : null}
      {errorA ? <p style={{ color: "red" }}>{errorA}</p> : null}
      <ul>
        {answers?.map((a) => (
          <li key={a.id}>{a.content}</li>
        ))}
      </ul>

      <h2>Matched Peers</h2>
      {loadingM ? <p>Loading...</p> : null}
      {errorM ? <p style={{ color: "red" }}>{errorM}</p> : null}
      <ul>
        {matches?.map((m) => (
          <li key={m.id}>{m.name} - Score: {m.matchScore}</li>
        ))}
      </ul>
    </div>
  );
}
