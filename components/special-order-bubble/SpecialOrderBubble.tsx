"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./SpecialOrderBubble.module.css";

/**
 * Bulle "Commande spéciale" — SYS'Y BOX EVENTS
 * -------------------------------------------------
 * 3 étapes :
 *  1. Avatar + bulle de dialogue (invitation à cliquer)
 *  2. Popup questionnaire "Trouver le cadeau parfait" (5 questions)
 *  3. Avatar de validation (commande confirmée)
 *
 * Placez ce fichier + SpecialOrderBubble.module.css dans /components,
 * et vos 3 images dans /public/images/avatars/ :
 *   - avatar-invitation.png   (étape 1, bulle sur page)
 *   - avatar-popup.png        (étape 2, en-tête du popup)
 *   - avatar-confirmation.png (étape 3, écran de confirmation)
 */

type Step = "bubble" | "popup" | "confirmation";

type QuestionId = "pour_qui" | "occasion" | "budget" | "style" | "delai";

interface Question {
  id: QuestionId;
  number: string;
  label: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: "pour_qui",
    number: "01",
    label: "Pour qui ?",
    options: [
      "Mon/ma partenaire",
      "Un(e) ami(e)",
      "Un membre de ma famille",
      "Un(e) collègue",
    ],
  },
  {
    id: "occasion",
    number: "02",
    label: "Pour quelle occasion ?",
    options: [
      "Anniversaire",
      "Amour",
      "Naissance",
      "Remerciement",
      "Sans occasion particulière",
    ],
  },
  {
    id: "budget",
    number: "03",
    label: "Quel budget ?",
    options: [
      "20 000 – 30 000 FCFA",
      "30 000 – 50 000 FCFA",
      "50 000 – 70 000 FCFA",
      "70 000 – 100 000 FCFA",
      "100 000 FCFA et plus",
    ],
  },
  {
    id: "style",
    number: "04",
    label: "Quel style ?",
    options: ["Élégant & sobre", "Gourmand", "Cocooning", "Romantique", "Fun & coloré"],
  },
  {
    id: "delai",
    number: "05",
    label: "Pour quand ?",
    options: [
      "Cette semaine",
      "Dans 2 à 3 semaines",
      "Le mois prochain",
      "Je regarde simplement",
    ],
  },
];

export default function SpecialOrderBubble() {
  const [step, setStep] = useState<Step>("bubble");
  const [openQuestion, setOpenQuestion] = useState<QuestionId | null>("pour_qui");
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, string>>>({});

  const allAnswered = QUESTIONS.every((q) => answers[q.id]);

  function selectAnswer(id: QuestionId, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    const idx = QUESTIONS.findIndex((q) => q.id === id);
    const next = QUESTIONS[idx + 1];
    setOpenQuestion(next ? next.id : null);
  }

  function submit() {
    if (!allAnswered) return;
    // TODO: envoyer `answers` à votre backend / API / webhook ici
    setStep("confirmation");
  }

  function reset() {
    setStep("bubble");
    setOpenQuestion("pour_qui");
    setAnswers({});
  }

  return (
    <div className={styles.wrapper}>
      {/* ÉTAPE 1 — Avatar + bulle de dialogue */}
      {step === "bubble" && (
        <div className={styles.bubbleContainer}>
          <div className={styles.speechBubble}>
            <p>Vous avez une commande spéciale en tête ?</p>
            <p>Cliquez ici pour créer le cadeau parfait !</p>
          </div>
          <div className={styles.avatarRow}>
            <div className={styles.avatarCircle}>
              <Image
                src="/image/avatar/avatar-invitation.png"
                alt="Avatar SYS'Y BOX — invitation à créer une commande spéciale"
                width={110}
                height={110}
                className={styles.avatarImg}
                priority
              />
            </div>
            <button
              type="button"
              className={styles.ctaButton}
              onClick={() => setStep("popup")}
            >
              🎁 Commande spéciale <span aria-hidden>›</span>
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 2 — Popup questionnaire */}
      {step === "popup" && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.popupCard}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Fermer"
              onClick={() => setStep("bubble")}
            >
              ×
            </button>

            <div className={styles.popupAvatar}>
              <Image
                src="/image/avatar/avatar-popup.png"
                alt="Avatar SYS'Y BOX — questionnaire cadeau parfait"
                width={130}
                height={130}
                className={styles.avatarImg}
              />
            </div>

            <h2 className={styles.popupTitle}>🎁 Trouver le cadeau parfait</h2>
            <p className={styles.popupSubtitle}>
              Quelques questions pour nous aider à imaginer la surprise idéale.
            </p>

            <div className={styles.questionList}>
              {QUESTIONS.map((q) => {
                const isOpen = openQuestion === q.id;
                const answer = answers[q.id];
                return (
                  <div key={q.id} className={styles.questionItem}>
                    <button
                      type="button"
                      className={styles.questionHeader}
                      onClick={() => setOpenQuestion(isOpen ? null : q.id)}
                    >
                      <span className={styles.questionNumber}>{q.number}</span>
                      <span className={styles.questionLabel}>
                        {q.label}
                        {answer && <span className={styles.questionAnswer}>{answer}</span>}
                      </span>
                      <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}>
                        {answer && !isOpen ? "✓" : "›"}
                      </span>
                    </button>

                    {isOpen && (
                      <div className={styles.optionsGrid}>
                        {q.options.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            className={`${styles.optionButton} ${
                              answer === opt ? styles.optionButtonSelected : ""
                            }`}
                            onClick={() => selectAnswer(q.id, opt)}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className={styles.submitButton}
              disabled={!allAnswered}
              onClick={submit}
            >
              C&apos;est parti ! <span aria-hidden>›</span>
            </button>
          </div>
        </div>
      )}

      {/* ÉTAPE 3 — Avatar de validation */}
      {step === "confirmation" && (
        <div className={styles.overlay} role="dialog" aria-modal="true">
          <div className={styles.popupCard}>
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Fermer"
              onClick={reset}
            >
              ×
            </button>

            <div className={styles.popupAvatar}>
              <Image
                src="/image/avatar/avatar-confirmation.png"
                alt="Avatar SYS'Y BOX — commande confirmée"
                width={140}
                height={140}
                className={styles.avatarImg}
              />
            </div>

            <div className={styles.checkCircle}>✓</div>

            <h2 className={styles.popupTitle}>Commande confirmée !</h2>
            <p className={styles.confirmationText}>
              Merci pour votre confiance !
              <br />
              Votre commande a bien été enregistrée.
              <br />
              Nous préparons votre box avec soin et vous tiendrons informé(e) très
              bientôt.
            </p>
            <p className={styles.signature}>À très vite ! 🤎</p>

            <button
              type="button"
              className={styles.submitButton}
              onClick={() => {
                /* TODO: rediriger vers /panier ou /commande */
                reset();
              }}
            >
              Voir mon panier <span aria-hidden>›</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}