import "./index.css";
import { Composition, Folder } from "remotion";
import { SwiftStackVideo } from "./SwiftStackVideo";
import { IntroScene } from "./scenes/IntroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { VerificationScene } from "./scenes/VerificationScene";
import { ResultsScene } from "./scenes/ResultsScene";
import { MetricsScene } from "./scenes/MetricsScene";
import { CTAScene } from "./scenes/CTAScene";

// Total duration: sum of scenes minus overlapping transitions
// 105 + 150 + 180 + 165 + 135 + 105 = 840 frames - (5 * 15) = 765 frames
const TOTAL_DURATION = 765;
const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full video composition */}
      <Composition
        id="SwiftStackVideo"
        component={SwiftStackVideo}
        durationInFrames={TOTAL_DURATION}
        fps={FPS}
        width={1920}
        height={1080}
      />

      {/* Individual scenes for preview/editing */}
      <Folder name="Scenes">
        <Composition
          id="Intro"
          component={IntroScene}
          durationInFrames={105}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Problem"
          component={ProblemScene}
          durationInFrames={150}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Verification"
          component={VerificationScene}
          durationInFrames={180}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Results"
          component={ResultsScene}
          durationInFrames={165}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="Metrics"
          component={MetricsScene}
          durationInFrames={135}
          fps={FPS}
          width={1920}
          height={1080}
        />
        <Composition
          id="CTA"
          component={CTAScene}
          durationInFrames={105}
          fps={FPS}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
