import { AbsoluteFill, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { LoginScene } from "./scenes/LoginScene";
import { UploadComparisonScene } from "./scenes/UploadComparisonScene";
import { UploadCOIScene } from "./scenes/UploadCOIScene";
import { ComparisonScene } from "./scenes/ComparisonScene";

export const ProductDemo: React.FC = () => {
  const { fps } = useVideoConfig();

  const transitionDuration = Math.round(0.5 * fps); // 0.5s fade between scenes

  return (
    <AbsoluteFill style={{ backgroundColor: "#F5F5F7" }}>
      <TransitionSeries>
        {/* Scene 1: Login */}
        <TransitionSeries.Sequence durationInFrames={Math.round(6 * fps)}>
          <LoginScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 2: Upload Comparison Documents */}
        <TransitionSeries.Sequence durationInFrames={Math.round(6 * fps)}>
          <UploadComparisonScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 3: Upload COI Documents */}
        <TransitionSeries.Sequence durationInFrames={Math.round(6 * fps)}>
          <UploadCOIScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />

        {/* Scene 4+5: Document Comparison + Analysis Results */}
        <TransitionSeries.Sequence durationInFrames={Math.round(14 * fps)}>
          <ComparisonScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
