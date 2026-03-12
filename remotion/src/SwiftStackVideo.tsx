import { loadFont } from "@remotion/google-fonts/Inter";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { AbsoluteFill } from "remotion";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { VerificationScene } from "./scenes/VerificationScene";
import { ResultsScene } from "./scenes/ResultsScene";
import { MetricsScene } from "./scenes/MetricsScene";
import { CTAScene } from "./scenes/CTAScene";

// Load Inter font (closest to Geist available in Google Fonts)
const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

// Scene durations in frames (at 30fps)
const INTRO = 3.5 * 30; // 3.5s - brand reveal
const PROBLEM = 5 * 30; // 5s - problem statement
const VERIFICATION = 6 * 30; // 6s - core demo
const RESULTS = 5.5 * 30; // 5.5s - analysis results
const METRICS = 4.5 * 30; // 4.5s - key metrics
const CTA = 3.5 * 30; // 3.5s - call to action

const TRANSITION = 15; // 0.5s transition between scenes

export const SwiftStackVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily }}>
      <TransitionSeries>
        {/* Scene 1: Brand intro */}
        <TransitionSeries.Sequence durationInFrames={INTRO}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Scene 2: The problem */}
        <TransitionSeries.Sequence durationInFrames={PROBLEM}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Scene 3: Verification demo */}
        <TransitionSeries.Sequence durationInFrames={VERIFICATION}>
          <VerificationScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Scene 4: Results panel */}
        <TransitionSeries.Sequence durationInFrames={RESULTS}>
          <ResultsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Scene 5: Metrics */}
        <TransitionSeries.Sequence durationInFrames={METRICS}>
          <MetricsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        {/* Scene 6: CTA */}
        <TransitionSeries.Sequence durationInFrames={CTA}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
