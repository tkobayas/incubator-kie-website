import useBaseUrl from "@docusaurus/useBaseUrl";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";

type Highlight = {
  title: string;
  image: string;
  body: React.ReactNode;
};

const HIGHLIGHTS: Highlight[] = [
  {
    title: "Kogito ergo cloud",
    image: "/img/kogito/homepage_graphic_1",
    body: (
      <p>
        Kogito is designed from ground up to run at scale on cloud
        infrastructure. By taking advantage of the latest technologies (Quarkus,
        Knative, etc.), you get amazingly fast boot times and instant scaling on
        orchestration platforms like Kubernetes.
      </p>
    ),
  },
  {
    title: "Kogito ergo domain",
    image: "/img/kogito/homepage_graphic_2",
    body: (
      <p>
        Kogito adapts to your business domain rather than the other way around.
        No more leaking abstraction of the tool into your client applications.
        Stay focused on what the business is about instead of being concerned
        with technology behind it.
      </p>
    ),
  },
  {
    title: "Kogito ergo power",
    image: "/img/kogito/homepage_graphic_3",
    body: (
      <>
        <p>
          Kogito offers a powerful developer experience based on battle-tested
          components:
        </p>
        <ul>
          <li>Tooling embeddable wherever you need it</li>
          <li>Code generation taking care of 80% of the work</li>
          <li>Flexibility to customize, only use what you need</li>
          <li>Simplified local development with live reload</li>
        </ul>
      </>
    ),
  },
];

function HighlightColumn({ highlight }: { highlight: Highlight }): JSX.Element {
  const image = useBaseUrl(`${highlight.image}.png`);
  const image2x = useBaseUrl(`${highlight.image}@2x.png`);
  return (
    <div className={styles.highlight}>
      <img
        className={styles.image}
        src={image}
        srcSet={`${image} 1x, ${image2x} 2x`}
        alt=""
        aria-hidden="true"
      />
      <Heading as="h2" className={styles.title}>
        {highlight.title}
      </Heading>
      {highlight.body}
    </div>
  );
}

/** The three "Kogito ergo ..." columns, embedded in the Kogito overview doc. */
export default function KogitoHighlights(): JSX.Element {
  return (
    <div className={styles.grid}>
      {HIGHLIGHTS.map((highlight) => (
        <HighlightColumn key={highlight.title} highlight={highlight} />
      ))}
    </div>
  );
}
