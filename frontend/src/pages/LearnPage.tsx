import React from 'react';
import { Link } from 'react-router-dom';

const rules = [
  {
    title: "1. Be Wary of Vague Health Claims",
    description:
      "If a health claim talks about improving your body without naming how it works—like what organ or process is affected—it might be misleading. Trust claims more when they explain a clear, testable biological mechanism.",
  },
  {
    title: "2. Watch Out for Fast, Guaranteed Results",
    description:
      "Claims that promise specific health or appearance changes in under 7 days often ignore how the body actually works. More reliable claims allow for individual variation and don't rush results.",
  },
  {
    title: "3. Don't Trust Claims That Dismiss Science Without Proof",
    description:
      "If a post goes against what most medical experts agree on and doesn't give solid evidence, it's a red flag. Healthy skepticism is okay—but only when it's backed by credible sources.",
  },
  {
    title: "4. Health Shouldn't Be Sold as a Shortcut",
    description:
      "If a product is the only path offered to a health result, especially when being sold, be skeptical. True wellness usually involves habits, not just purchases.",
  },
  {
    title: "5. Before-and-After Photos Can Be Misleading",
    description:
      "Transformation photos without disclaimers or data can give a false sense of results. Look for context, studies, or transparency to trust them more.",
  },
  {
    title: "6. \"Natural\" Doesn't Always Mean Proven",
    description:
      "Claims that rely only on being \"natural,\" \"ancient,\" or \"secret\" need more than just those words to be trustworthy. Evidence or context matters, even for traditional remedies.",
  },
  {
    title: "7. Mental Health Isn't Fixed With One Thing",
    description:
      "Any post claiming a single diet, habit, or supplement can cure depression or anxiety is oversimplifying a complex issue. Real care usually requires multiple forms of support.",
  },
  {
    title: "8. Don't Let Anyone Dismiss Therapy Without Reason",
    description:
      "If a post discourages professional treatment without explaining why or giving evidence, it can be harmful. Mental health advice should never replace licensed care without good reason.",
  },
  {
    title: "9. One Food Won't Fix Everything",
    description:
      "If a post says one food or ingredient can solve a big health issue on its own, be cautious. It's more believable if the food is described as part of a balanced approach.",
  },
  {
    title: "10. Spot Reduction Is a Myth",
    description:
      "You can't target fat loss from one part of your body by doing certain exercises. Fat loss happens across the body and depends on consistent, full-body habits.",
  },
];

const LearnPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Learn to Spot Health Misinformation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These 10 rules will help you quickly identify misleading health claims online. Tap or hover each card to review.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start transition-transform hover:scale-105 focus-within:scale-105"
            >
              <h2 className="font-bold text-lg text-gray-900 mb-2">{rule.title}</h2>
              <p className="text-gray-700 text-base">{rule.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/feed"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            Take Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LearnPage; 