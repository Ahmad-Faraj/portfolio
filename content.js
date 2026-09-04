/**
 * Single source of truth for every version of the site.
 *
 * Rules for editing:
 *  - Only verified facts. Every `href` should resolve.
 *  - Open-source items carry their real state (merged / open / closed).
 *    Honest state reads better than an inflated one.
 *  - Dates are absolute. `null` end date means ongoing.
 */

export const meta = {
  name: 'Ahmed Faraj',
  handle: 'Ahmad-Faraj',
  role: 'Backend & Distributed Systems',
  location: 'Port Said, Egypt',
  email: 'ahmed.faraj.cs@gmail.com',
  phone: '+20 106 234 2090',
  updated: 'August 2026',
  // `stamp` is deliberately absent. It is the raw output of date(1), the way
  // cs.princeton.edu/~bwk carries one, and build.mjs derives it from the newest
  // mtime across this file and the templates. A hand-typed one goes stale, and
  // a stale stamp argues against the very thing it is there to assert.
  photo: 'photo.jpg',
  // Postal block, the way all three reference pages carry one.
  address: [
    'Faculty of Computers & Informatics',
    'Suez Canal University',
    'Ismailia, Egypt',
  ],
  // Spaced rather than punctuated, the way bwk writes his.
  emailPlain: 'ahmed.faraj.cs gmail com',
  // One paragraph. No adjectives that a reader could not verify from the page below.
  bio: `Software engineer at Datajar, building data ingestion and attribution
        pipelines for an analytics platform. Final-year CS at Suez Canal
        University. I spend most of my time in Go and Python on distributed
        systems, and most of the rest reading other people's code: CNCF
        projects, GitLab, and 6,106 MCP servers I put in a sandbox to see
        whether they do what their spec says.`,
};

/**
 * First-person prose, for the versions built in the faculty-page idiom
 * (nil.lcs.mit.edu/rtm, stroustrup.com). There, the work is named inside
 * sentences rather than itemised, and every noun that matters is a link.
 *
 * `[label](url)` is turned into an anchor by `md()` in shared.mjs. Everything
 * outside the brackets is escaped.
 */
export const narrative = [
  `I am a software engineer at [Datajar](https://datajar.co/) in Berlin, working
   remotely from Egypt on the data ingestion and attribution pipelines behind an
   analytics platform: Shopify, Shopware and the ad networks in one side, a
   tenant-isolated warehouse out the other. I am in my final year of Computer
   Science at Suez Canal University.`,

  `My interests are operating systems, distributed systems, and the gap between
   what a specification says and what deployed software actually does. Most
   recently I measured that gap: I built
   [mcpprobe](https://github.com/Ahmad-Faraj/mcp-conformance), a harness that
   installs an arbitrary Model Context Protocol server into a locked-down
   container and drives it through the protocol, and ran it over the complete
   frame of 6,106 registered servers. Two in five never complete a handshake.
   The dominant deviation turned out to belong to three SDKs rather than to
   thousands of authors, which is now the first deployment evidence attached to
   [SEP-2145](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2145).`,

  `I spend a good deal of time reading other people's code. In the cloud native
   projects that has meant a scheduler cancel race in
   [PipeCD](https://github.com/pipe-cd/pipecd/pull/6979), group-mention lookup in
   its [Slack notifier](https://github.com/pipe-cd/pipecd/pull/6981), MPIJob
   dependency interpretation in
   [Karmada](https://github.com/karmada-io/karmada/pull/7721), a leaked response
   body in its [aggregated request handler](https://github.com/karmada-io/karmada/pull/7733),
   sentinel-path validation in [kured](https://github.com/kubereboot/kured/pull/1372),
   and tracing a ServiceAccount downsync bug in
   [KubeStellar](https://github.com/kubestellar/kubestellar/issues/3870) to a
   metadata-only apply path in library-go. Earlier, in the
   [GitLab Development Kit](https://gitlab.com/gitlab-org/gitlab-development-kit/-/merge_requests/5345),
   it meant false port conflicts between Nginx and Zoekt, and
   [TTY guards](https://gitlab.com/gitlab-org/gitlab-development-kit/-/merge_requests/5291)
   in front of destructive backup operations.`,

  `Other things I have built include
   [Orbit Onboard](https://github.com/Ahmad-Faraj/orbit-onboard-aws), which ranks
   a codebase by call centrality to tell a new contributor what to read first;
   [Star Pupil](https://github.com/Ahmad-Faraj/star-pupil) and
   [Stet](https://github.com/Ahmad-Faraj/stet), two attempts at making study
   harder on purpose; a [Lox interpreter](https://github.com/Ahmad-Faraj/jlox) on
   the JVM; and an [operating system](https://github.com/Ahmad-Faraj/jack-os) for
   a 16-bit machine built up from NAND gates.`,

  `I compete. ACPC finalist, Meta Hacker Cup round two,
   [Codeforces](https://codeforces.com/profile/Ahmed_Faraj) Expert, and somewhere
   past three thousand problems. I ran training for
   [ICPC SCU](https://github.com/Ahmad-Faraj/icpc-scu) and wrote 50+ problems for
   the Egyptian collegiate contest.`,
];

export const links = [
  { label: 'GitHub',     href: 'https://github.com/Ahmad-Faraj',              text: 'github.com/Ahmad-Faraj' },
  { label: 'GitLab',     href: 'https://gitlab.com/Ahmad-Faraj',              text: 'gitlab.com/Ahmad-Faraj' },
  { label: 'LinkedIn',   href: 'https://linkedin.com/in/ahmed-faraj-cs',      text: 'in/ahmed-faraj-cs' },
  { label: 'Email',      href: 'mailto:ahmed.faraj.cs@gmail.com',             text: 'ahmed.faraj.cs@gmail.com' },
  { label: 'Codeforces', href: 'https://codeforces.com/profile/Ahmed_Faraj',  text: 'Ahmed_Faraj' },
  { label: 'Kaggle',     href: 'https://www.kaggle.com/ahmadfrag',            text: 'ahmadfrag' },
  { label: 'YouTube',    href: 'https://www.youtube.com/@Ahmad_Faraj/videos', text: '@Ahmad_Faraj' },
  { label: 'CV (PDF)',   href: 'ahmed_faraj_cv.pdf',                          text: 'ahmed_faraj_cv.pdf' },
];

export const experience = [
  {
    org: 'Datajar',
    orgNote: 'AI Data Analytics',
    title: 'Software Engineer',
    detail: 'Part-time',
    place: 'Berlin, Germany (remote)',
    from: 'Nov 2025',
    to: null,
    href: 'https://datajar.co/',
    // Written in the same voice as the open-source items below: what the thing
    // is and what it does, no counts. Scope numbers (datasets, users, GB,
    // environments) are facts about the company, not about the engineering, and
    // sitting two inches above a 95% confidence interval they made the measured
    // numbers look like the same species. The one load figure that survives is
    // spelled out, so it reads as a statement rather than a badge.
    points: [
      'Designed the ingestion path across three services, from the source APIs to the warehouse.',
      'Wrote the integrations for Shopify, Shopware and the Meta and Google ad APIs, and took the pipeline to ten thousand requests a minute.',
      'Built the attribution path for PostHog, Google Analytics, GTM and the Meta Pixel.',
      'Enforced tenant isolation with a MinIO registry behind a WorkOS auth layer.',
    ],
  },
];

export const research = [
  {
    title: 'Does Your MCP Server Actually Follow the Protocol?',
    subtitle: 'A Large-Scale Execution-Based Conformance Study of the Model Context Protocol Ecosystem',
    authors: 'A. Faraj',
    // Not on arXiv yet, so it is described as what it is: a preprint, shipped here.
    // Change this to 'arXiv preprint (cs.SE)' once it has an arXiv identifier.
    venue: 'Preprint',
    date: 'Aug 2026',
    // Shipped alongside the page, so the title links to the paper itself rather
    // than to the repository that produces it.
    pdf: 'Faraj_MCP_conformance_preprint.pdf',
    thumb: 'paper-p1.jpg',
    points: [
      'Executed 6,106 registered servers in isolated Docker sandboxes; only 61.1% (95% CI 59.8–62.3) complete a protocol handshake as published.',
      'Traced an 88.4% shared deviation to defaults in three SDKs rather than thousands of independent author decisions, supplying the first deployment data to open spec proposal SEP-2145.',
      'Surfaced a silent-execution class: 129 servers run tools on arguments their own declared schema rejects, violating an explicit MUST in the specification.',
      'Filed 15 responsible-disclosure reports for servers that crash or hang on a malformed frame; several are already fixed.',
    ],
    artifacts: [
      { label: 'Harness & dataset', href: 'https://github.com/Ahmad-Faraj/mcp-conformance' },
      { label: 'SEP-2145',          href: 'https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2145' },
      { label: 'SEP-1303',          href: 'https://github.com/modelcontextprotocol/modelcontextprotocol/issues/1303' },
    ],
  },
];

/**
 * `state` is rendered verbatim. Keep it truthful.
 */
export const openSource = [
  {
    org: 'CNCF',
    note: 'Cloud native',
    from: 'Jun 2026',
    to: null,
    // /search, not /pulls; the latter 404s for logged-out visitors.
    href: 'https://github.com/search?q=is%3Apr+author%3AAhmad-Faraj+-user%3AAhmad-Faraj&type=pullrequests',
    items: [
      {
        ref: 'pipecd#6979', state: 'open',
        href: 'https://github.com/pipe-cd/pipecd/pull/6979',
        text: 'Fixed a scheduler cancel race that abandoned a running stage and ran rollback in parallel with it.',
        extra: { label: 'reported as #6978', href: 'https://github.com/pipe-cd/pipecd/issues/6978' },
      },
      {
        ref: 'pipecd#6981', state: 'merged',
        href: 'https://github.com/pipe-cd/pipecd/pull/6981',
        text: 'Fixed group-mention lookup so failed-deployment Slack alerts reach the right on-call group.',
      },
      {
        ref: 'kubestellar#3870', state: 'diagnosis',
        href: 'https://github.com/kubestellar/kubestellar/issues/3870',
        text: 'Root-caused ServiceAccount secrets never reaching edge clusters to a metadata-only apply path in library-go, on someone else’s bug report.',
      },
      {
        ref: 'karmada#7721', state: 'open',
        href: 'https://github.com/karmada-io/karmada/pull/7721',
        text: 'Added MPIJob dependency interpretation so mounted ConfigMaps and Secrets follow the job to member clusters.',
        extra: { label: 'reported as #7720', href: 'https://github.com/karmada-io/karmada/issues/7720' },
      },
      {
        ref: 'karmada#7733', state: 'open',
        href: 'https://github.com/karmada-io/karmada/pull/7733',
        text: 'Closed a leaked response body on early returns in the aggregated request handler.',
      },
      {
        ref: 'vitess#20364', state: 'merged',
        href: 'https://github.com/vitessio/vitess/pull/20364',
        text: 'Renamed reserved-connection reconnect test packages to describe what they actually exercise.',
      },
      {
        ref: 'oras#2087', state: 'merged',
        href: 'https://github.com/oras-project/oras/pull/2087',
        text: 'Fixed a typo in the log entry separator constant.',
      },
      {
        ref: 'kured#1372', state: 'open',
        href: 'https://github.com/kubereboot/kured/pull/1372',
        text: 'Validated the sentinel file path in NewFileRebootChecker instead of failing later at reboot time.',
      },
    ],
  },
  {
    org: 'GitLab',
    note: 'Development Kit, main repo',
    from: 'Oct 2025',
    to: 'Jan 2026',
    // Project-scoped search, not /dashboard; the latter requires a login.
    // Covers the GDK items only; the gitlab-org/gitlab ones link individually.
    href: 'https://gitlab.com/gitlab-org/gitlab-development-kit/-/merge_requests?scope=all&state=merged&author_username=Ahmad-Faraj',
    items: [
      {
        ref: 'gdk!5345', state: 'merged',
        href: 'https://gitlab.com/gitlab-org/gitlab-development-kit/-/merge_requests/5345',
        text: 'Resolved false port conflicts between Nginx and Zoekt that blocked local environments from starting.',
      },
      {
        ref: 'gdk!5291', state: 'merged',
        href: 'https://gitlab.com/gitlab-org/gitlab-development-kit/-/merge_requests/5291',
        text: 'Added TTY guards before destructive backup and log operations.',
      },
      {
        ref: 'gdk!5298', state: 'merged',
        href: 'https://gitlab.com/gitlab-org/gitlab-development-kit/-/merge_requests/5298',
        text: 'Fixed the TTY tests that were blocking CI.',
      },
      {
        ref: 'gitlab!207789', state: 'merged',
        href: 'https://gitlab.com/gitlab-org/gitlab/-/merge_requests/207789',
        text: 'Rewrote the API pages curl examples into the multi-line form the docs style guide asks for.',
      },
      {
        ref: 'gitlab!207557', state: 'merged',
        href: 'https://gitlab.com/gitlab-org/gitlab/-/merge_requests/207557',
        text: 'Added descriptive alt text to the ChatOps deployment images.',
      },
      {
        ref: 'Hackathon', state: '2nd globally',
        href: 'https://contributors.gitlab.com/hackathon',
        text: 'Placed 2nd worldwide in the GitLab Hackathon among 100+ contributors, Oct 2025.',
      },
    ],
  },
  {
    org: 'Elsewhere',
    note: 'Rust, Go',
    from: '2025',
    to: null,
    href: 'https://github.com/search?q=is%3Apr+author%3AAhmad-Faraj+is%3Amerged+-user%3AAhmad-Faraj&type=pullrequests',
    items: [
      {
        ref: 'solang#1988', state: 'merged',
        href: 'https://github.com/hyperledger-solang/solang/pull/1988',
        text: 'Lowered extendTtl and extendInstanceTtl in the Soroban codegen path of the Solidity compiler.',
      },
    ],
  },
];

export const projects = [
  {
    name: 'Orbit Onboard on AWS',
    tag: 'Python · AWS Lambda · SQS · DynamoDB',
    date: 'Jun 2026',
    blurb: `A new contributor opens an unfamiliar repository and has no idea what
            matters. Orbit Onboard reads the GitLab Knowledge Graph, ranks 13K+
            definitions by call centrality, and writes the orientation a maintainer
            would have written by hand. This is the architecture that runs it as a
            multi-user service.`,
    points: [
      'Knowledge Graph agent ranks 13K+ symbol definitions by call centrality to produce a reading order for a codebase.',
      'Serverless AWS backend: API Gateway with Cognito JWT, DynamoDB cache, SQS queue into a container worker Lambda, S3 + SNS out, DLQ for failures.',
      'Under 500 ms on a cache hit, zero idle compute, WAF and KMS on the edge. Built for the GitLab Transcend Hackathon; submitted as the Manara AWS SAA graduation project.',
    ],
    linksOut: [
      { label: 'Demo',         href: 'https://www.youtube.com/watch?v=q9eqNdPvqoA' },
      { label: 'Architecture', href: 'https://github.com/Ahmad-Faraj/orbit-onboard-aws' },
      { label: 'Source',       href: 'https://gitlab.com/Ahmad-Faraj/orbit-onboard' },
    ],
  },
  {
    name: 'mcpprobe',
    tag: 'Python · Docker · JSON-RPC',
    date: 'Jul 2026',
    blurb: `The measurement harness behind the conformance study. Installs an
            arbitrary MCP server, runs it under --cap-drop ALL with no host mounts,
            and grades it against the protocol version it negotiates rather than
            the latest spec.`,
    points: [
      'Eight conformance checks over the protocol lifecycle: handshake, ping, tool schema meta-validation, unknown-tool and invalid-argument handling, malformed-frame survival, stdout purity.',
      'Two execution modes (ephemeral online, and two-phase offline where measurement runs with --network=none), verified to produce statistically indistinguishable results.',
      'Every reported number regenerates from released raw transcripts at a pinned harness tag.',
    ],
    linksOut: [
      { label: 'Repository', href: 'https://github.com/Ahmad-Faraj/mcp-conformance' },
    ],
  },
  {
    name: 'Star Pupil',
    tag: 'TypeScript · React Flow · LLM',
    date: 'Jul 2026',
    blurb: `Teaching something is the fastest way to find out you never understood
            it. Star Pupil gives you a student that knows nothing, believes exactly
            what you tell it, and sits an exam you never see beforehand. Every mark
            it loses traces back to a specific sentence in your lesson.`,
    points: [
      'An examiner seals a concept map with prerequisite edges before the lesson starts; the learner only ever sees the reachable frontier, so the exam is not a checklist walk.',
      'Misconceptions are grounded in quoted source text and propagate along the graph, so a lost mark traces to the root sentence rather than the nearest mistake.',
      'The report card splits coverage from accuracy: a confident 6/6 on half the subject is a different result from a shaky 6/6 on all of it.',
    ],
    linksOut: [
      { label: 'Repository', href: 'https://github.com/Ahmad-Faraj/star-pupil' },
    ],
  },
  {
    name: 'Stet',
    tag: 'TypeScript · Next.js · LLM',
    date: 'Jul 2026',
    blurb: `Re-reading your notes feels like studying and is not. Recognition is
            cheap and it fakes competence. Stet plants misprints in your own notes,
            sets the page as a galley proof, and hands you the red pencil.`,
    points: [
      'Three-stage generator: edits applied by exact string match in code, then a fact desk that must prove the edit false, then a copy desk forbidden from domain knowledge that kills anything with a stylistic tell.',
      'Scores the false strike (correct text you struck anyway) because knowledge you will abandon under pressure is the thing no quiz app measures.',
      'Code mode plants bugs that still compile; in testing it turned a Fisher–Yates shuffle into Sattolo’s algorithm.',
    ],
    linksOut: [
      { label: 'Repository', href: 'https://github.com/Ahmad-Faraj/stet' },
    ],
  },
  {
    name: 'Event Streaming System',
    tag: 'Go · Kafka · Redis',
    date: 'Ongoing',
    blurb: `A distributed event pipeline that records and processes real-time
            events with a top-N popularity ranking, exposed over REST.`,
    points: [
      'Producer/consumer pipeline over Kafka with Redis-backed top-N ranking under concurrent writes.',
      'REST endpoints for detail lookup and querying, with explicit concurrency and error handling.',
    ],
    linksOut: [
      { label: 'Walkthrough', href: 'https://www.youtube.com/@Ahmad_Faraj/playlists' },
    ],
  },
  {
    name: 'jlox',
    tag: 'Java · JVM',
    date: '2025',
    blurb: `A recursive-descent interpreter for the Lox language on the JVM:
            scanner, parser, resolver, tree-walking evaluator, closures and
            lexical scoping, with AST classes generated by the build.`,
    points: [
      'Post-order AST evaluation with a separate resolution pass for lexical scoping and closures.',
      'AST class generation and unit tests driven from a Makefile; Java FFI for native interop.',
    ],
    linksOut: [
      { label: 'Repository', href: 'https://github.com/Ahmad-Faraj/jlox' },
    ],
    stars: 17,
  },
  {
    name: 'Jack OS',
    tag: 'Jack · HDL · VM',
    date: '2025',
    blurb: `An operating system for the 16-bit Hack computer, written in Jack:
            memory allocator, math library, screen and keyboard drivers, string
            and array types, system I/O.`,
    points: [
      'Built bottom-up from NAND gates through a stack VM to the OS layer, as the capstone of Nand2Tetris.',
    ],
    linksOut: [
      { label: 'Repository', href: 'https://github.com/Ahmad-Faraj/jack-os' },
    ],
    stars: 3,
  },
];

export const education = [
  {
    school: 'Suez Canal University',
    degree: 'B.Sc. Computer Science',
    faculty: 'Faculty of Computers & Informatics',
    place: 'Ismailia, Egypt',
    from: 'Sep 2023',
    to: 'Jul 2027',
    points: [
      'GPA 3.65 / 4.00, ranked 3rd in class, Academic Excellence Award.',
      'Coursework: data structures, algorithms, operating systems, databases, computer networks, distributed systems.',
    ],
    // Shipped alongside the page, so this stays correct wherever the site is deployed.
    href: 'ahmed_faraj_transcript_english.pdf',
    hrefLabel: 'Transcript',
  },
];

export const achievements = [
  {
    group: 'Competitive programming',
    items: [
      { text: 'ACPC Finalist: 84th at the Arab Collegiate Programming Contest, 59th at ECPC, 1st in university.', date: 'Aug 2025', href: 'https://icpc.global/ICPCID/XRR2FB1ZXTL5', hrefLabel: 'ICPC' },
      { text: 'Meta Hacker Cup: advanced to Round 2, 1,480 of 5,972.', date: 'Oct 2025', href: 'https://www.facebook.com/codingcompetitions/hacker-cup/2025/certificate/3769267336631460', hrefLabel: 'Meta' },
      { text: 'Codeforces Expert, top 1% in Egypt.', date: null, href: 'https://codeforces.com/profile/Ahmed_Faraj', hrefLabel: 'Codeforces' },
      { text: 'LeetCode Knight, top 2% globally.', date: null, href: 'https://leetcode.com/u/Ahmed_Faraj/', hrefLabel: 'LeetCode' },
      { text: '3,000+ algorithmic problems and 100+ SQL problems solved.', date: null, href: 'https://atcoder.jp/users/Ahmed_Faraj', hrefLabel: 'AtCoder' },
    ],
  },
  {
    group: 'Certifications',
    // The full, dated list lives on LinkedIn; only the two with a public
    // verification page are named here.
    href: 'https://www.linkedin.com/in/ahmed-faraj-cs/details/certifications/',
    hrefLabel: 'All certifications',
    items: [
      { text: 'AWS Certified Solutions Architect, Associate (SAA-C03).', date: '2026', href: 'https://www.credly.com/badges/a5eb4751-17bd-4716-8ec5-40380e701ea9/public_url', hrefLabel: 'Credly' },
      // The path is /certificate/ (singular). The /certificates/ form in the CV 404s.
      { text: 'Redis Certified Associate Developer.', date: '2026', href: 'https://university.redis.io/certificate/ix59xm1sikrqy1', hrefLabel: 'Redis' },
    ],
  },
];

export const community = [
  {
    text: 'YouTube: technical videos on AI agents, systems programming, and competitive programming.',
    href: 'https://www.youtube.com/@Ahmad_Faraj/videos', hrefLabel: 'Channel',
  },
  {
    text: 'ICPC SCU, IT Head: mentored 1K+ students in data structures and algorithms, authored 50+ ECPC problems.',
    href: 'https://github.com/Ahmad-Faraj/icpc-scu', hrefLabel: 'Archive',
  },
  {
    text: 'GDG SCU, IT Specialist: ran programming fundamentals sessions for 100+ students.',
    href: 'https://github.com/Ahmad-Faraj/gdg-scu', hrefLabel: 'Archive',
  },
  {
    text: 'CP-Template: competitive programming templates and references used by the SCU team.',
    href: 'https://github.com/Ahmad-Faraj/CP-Template', hrefLabel: '13 stars',
  },
];

export const skills = [
  { group: 'Languages',    items: ['Go', 'Python', 'C/C++', 'Java', 'TypeScript', 'Rust'] },
  { group: 'Systems',      items: ['Linux', 'Docker', 'Kubernetes', 'Terraform', 'Kafka', 'Nginx'] },
  { group: 'Data',         items: ['PostgreSQL', 'Redis', 'MongoDB', 'DynamoDB', 'MinIO', 'S3'] },
  { group: 'Cloud',        items: ['AWS', 'GCP', 'Lambda', 'SQS', 'CI/CD'] },
  { group: 'Web',          items: ['Node.js', 'FastAPI', 'React', 'Next.js', 'Express'] },
  { group: 'Daily driver', items: ['Neovim', 'tmux', 'git'] },
];

/** Small numbers worth stating plainly. Used by versions that show a header strip. */
export const facts = [
  { k: '6,106', v: 'MCP servers measured' },
  { k: '10K+',  v: 'requests / minute in production' },
  { k: '3rd',   v: 'in class, GPA 3.65' },
  { k: '3,000+',v: 'problems solved' },
];
