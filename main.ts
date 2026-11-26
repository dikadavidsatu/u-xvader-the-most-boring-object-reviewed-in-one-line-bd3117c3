// The Most Boring Object, Reviewed in One Line
// ----------------------------------------------
// The brief asks for a review of the most boring object imaginable,
// delivered in exactly one line. This program builds that review from
// named parts, validates it against the entry gate (a single printed
// line, no stray newlines, a sane character budget), and only then
// prints it. The output is fully deterministic: no clocks, no random
// numbers, no input, no network — the same line every single run,
// which is fitting, because the object under review never changes
// either. It just sits there. Holding paper. Forever.

/** The star of the show: aggressively, professionally dull. */
const OBJECT_UNDER_REVIEW = "The paperclip";

/** One star. Generous, frankly, for a bent piece of wire. */
const STAR_RATING = "one star";

/**
 * The clauses of the review, in performance order. Each clause earns
 * its place: the first states the paperclip's one achievement, the
 * second denies it the dignity of a promotion, and the third lands
 * the punchline by turning the pressure joke back on the reviewer.
 */
const REVIEW_CLAUSES: readonly string[] = [
  "it held my entire career together for three years",
  "never got promoted",
  "and still bent under less pressure than I do",
];

/** Hard ceiling for the printed line, in characters. */
const MAX_LINE_CHARACTERS = 200;

/**
 * Join the rating and the clauses into a single review sentence.
 * The separator is an em dash after the rating, then plain commas
 * and spaces between clauses, so the line reads like one breathless
 * product review typed by someone with feelings about stationery.
 */
function composeReview(objectName: string, rating: string, clauses: readonly string[]): string {
  const body = clauses.join(", ");
  return `${objectName}: ${rating} — ${body}.`;
}

/**
 * Validate the finished line against the gate before printing:
 *  - it must be exactly one line (no newline characters at all),
 *  - it must be non-empty once trimmed,
 *  - it must stay inside the character budget,
 *  - it must actually name the object and carry its rating.
 * Any failure throws, so a broken review can never reach stdout.
 */
function validateReview(line: string, objectName: string, rating: string): void {
  if (line.length === 0) {
    throw new Error("review is empty");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("review must be a single line");
  }
  if (line.length > MAX_LINE_CHARACTERS) {
    throw new Error(`review is ${line.length} characters, over the ${MAX_LINE_CHARACTERS} budget`);
  }
  if (!line.startsWith(objectName)) {
    throw new Error("review must open by naming the object under review");
  }
  if (!line.includes(rating)) {
    throw new Error("review must include its star rating");
  }
  if (!line.endsWith(".")) {
    throw new Error("review must end like a sentence, with a full stop");
  }
}

/**
 * Count the words in the line. A one-line review should still read
 * at a gallop: long enough to set up the joke, short enough that
 * the punchline arrives before the reader's attention files for
 * unemployment. The gate below keeps it inside that window.
 */
function countWords(line: string): number {
  return line.split(/\s+/).filter((word) => word.length > 0).length;
}

/** The word-count window a punchy one-liner has to fit inside. */
const MIN_WORDS = 15;
const MAX_WORDS = 40;

/**
 * Second gate pass: check the rhythm of the line, not just its
 * shape. Three clauses, a word count inside the window, and no
 * double spaces sneaking in where the joinery was sloppy.
 */
function validateRhythm(line: string, clauses: readonly string[]): void {
  if (clauses.length !== 3) {
    throw new Error(`review needs exactly three clauses, found ${clauses.length}`);
  }
  const words = countWords(line);
  if (words < MIN_WORDS || words > MAX_WORDS) {
    throw new Error(`review is ${words} words, outside the ${MIN_WORDS}-${MAX_WORDS} window`);
  }
  if (line.includes("  ")) {
    throw new Error("review contains a double space");
  }
}

/** Build the review, check it twice, and print exactly that one line. */
function main(): void {
  const review = composeReview(OBJECT_UNDER_REVIEW, STAR_RATING, REVIEW_CLAUSES);
  validateReview(review, OBJECT_UNDER_REVIEW, STAR_RATING);
  validateRhythm(review, REVIEW_CLAUSES);
  console.log(review);
}

main();
