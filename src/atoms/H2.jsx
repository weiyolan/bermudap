export default function H2({ text, className }) {
  return (
    <h2
      className={`text-browndark font-bel font-semibold text-3xl mb-6 sm:mb-12  ${
        className && className
      }`}
    >
      {text}
    </h2>
  );
}
