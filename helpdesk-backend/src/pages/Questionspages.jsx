import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuestions } from "../hooks/useQuestions";
import { useAnswers } from "../hooks/useAnswers";
import { useAuthContext } from "../hooks/useAuth";

export default function QuestionPage() {
  const { id } = useParams(); // questionId from URL
  const { user } = useAuthContext();

  const {
    question,
    loading: questionLoading,
    error: questionError,
  } = useQuestions(id);

  const {
    answers,
    loading: answersLoading,
    error: answersError,
    createAnswer,
    upvoteAnswer,
    markAsAccepted,
  } = useAnswers(id);

  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /* ---------- SUBMIT ANSWER ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      setSubmitting(true);
      await createAnswer(id, content);
      setContent("");
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- LOADING / ERROR ---------- */

  if (questionLoading) return <p>Loading question...</p>;
  if (questionError) return <p>{questionError}</p>;
  if (!question) return <p>Question not found</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      {/* ---------- QUESTION ---------- */}
      <h2>{question.title}</h2>
      <p>{question.description}</p>

      <p style={{ color: "#666", fontSize: "14px" }}>
        Views: {question.views} | Upvotes: {question.upvotes}
      </p>

      <hr />

      {/* ---------- ANSWERS ---------- */}
      <h3>Answers</h3>

      {answersLoading && <p>Loading answers...</p>}
      {answersError && <p>{answersError}</p>}

      {!answersLoading && answers?.length === 0 && (
        <p>No answers yet. Be the first!</p>
      )}

      {answers?.map((answer) => (
        <div
          key={answer.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            background: answer.isAccepted ? "#e6fffa" : "#fff",
          }}
        >
          <p>{answer.content}</p>

          <div style={{ fontSize: "14px", color: "#555" }}>
            👍 {answer.upvotes}
          </div>

          <div style={{ marginTop: "5px" }}>
            <button onClick={() => upvoteAnswer(answer.id)}>
              Upvote
            </button>

            {/* Mark accepted (basic UI check) */}
            {user && question.userId === user.uid && !answer.isAccepted && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => markAsAccepted(answer.id)}
              >
                Mark as accepted
              </button>
            )}

            {answer.isAccepted && (
              <span style={{ marginLeft: "10px", color: "green" }}>
                ✔ Accepted
              </span>
            )}
          </div>
        </div>
      ))}

      <hr />

      {/* ---------- ADD ANSWER ---------- */}
      <h3>Your Answer</h3>

      {!user && <p>Please log in to answer.</p>}

      {user && (
        <form onSubmit={handleSubmit}>
          <textarea
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your answer here..."
            style={{ width: "100%", marginBottom: "10px" }}
          />

          <button type="submit" disabled={submitting}>
            {submitting ? "Posting..." : "Post Answer"}
          </button>
        </form>
      )}
    </div>
  );
}
