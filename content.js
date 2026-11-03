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
  role: 'LLM agents and cloud-native infrastructure',
  location: 'Port Said, Egypt',
  email: 'ahmed.faraj.cs@gmail.com',
  phone: '+20 106 234 2090',
  updated: 'November 2026',
  // `stamp` is deliberately absent. It is the raw output of date(1), the way
  // cs.princeton.edu/~bwk carries one, and build.mjs derives it from the newest
  // mtime across this file and the templates. A hand-typed one goes stale, and
  // a stale stamp argues against the very thing it is there to assert.
  photo: 'photo.jpg',
  // 400x400, cropped from the same 900x1600 original: top of the hair to the
  // folded arms, centred on the face. Used by v6; the others keep the tall one.
  photoSquare: 'photo-square.jpg',
  // Postal block, the way all three reference pages carry one.
  address: [
    'Faculty of Computers & Informatics',
    'Suez Canal University',
    'Ismailia, Egypt',
  ],
  // Spaced rather than punctuated, the way bwk writes his.
  emailPlain: 'ahmed.faraj.cs gmail com',
  // One paragraph. No adjectives that a reader could not verify from the page below.
  bio: `Software engineer at Datajar, building the LLM agent that proposes
        changes to a merchant's store and ad accounts, and the explainable BI
        behind it. Final-year CS at Suez Canal University. Kubeflow org member
        and contributor to Kyverno and PipeCD. Sole author of an
        execution-based census of 6,106 MCP servers, submitted to Empirical
        Software Engineering.`,
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
  `I am a software engineer at [Datajar](https://datajar.co/), an AI analytics
   company in Berlin, working part-time and remotely from Egypt. I build the
   path by which an LLM agent proposes a change to a merchant's Shopify, Meta,
   Zid or Salla account and a person approves it before anything is written,
   and the BI behind it, where every figure in a chat answer can show where it
   came from. I am in my final year of Computer Science at Suez Canal
   University.`,

  `My interests are distributed systems, LLM agents, and the gap between what a
   specification says and what deployed software actually does. Most recently I
   measured that gap: I built
   [a harness](https://github.com/Ahmad-Faraj/mcp-conformance) that installs a
   Model Context Protocol server into a locked-down container and drives it
   through the protocol, and ran it over all 6,106 installable servers in the
   official registry. Only 63.5% start and complete a handshake. The dominant
   deviation belongs to SDK defaults rather than to thousands of authors, which
   is now the first field data attached to
   [SEP-2145](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2145#issuecomment-5142039121).
   Six maintainers fixed their servers after my reports, and the
   [Go SDK bug report](https://github.com/modelcontextprotocol/go-sdk/issues/1209)
   credits the study. The [paper](https://doi.org/10.5281/zenodo.22996025) is
   submitted to Empirical Software Engineering.`,

  `I spend a good deal of time reading other people's code. I am a
   [Kubeflow org member](https://github.com/kubeflow/internal-acls/pull/982):
   there I made failed tool calls in its
   [MCP server](https://github.com/kubeflow/mcp-server/pull/282) report an error
   instead of success, and fixed a nil dereference in
   [Trainer's MPI plugin](https://github.com/kubeflow/trainer/pull/4333). In
   [Kyverno](https://github.com/kyverno/kyverno/pull/17641) I made
   PolicyException updates reach namespaced CEL policies at once, and fixed
   [colliding webhook names](https://github.com/kyverno/kyverno/pull/17558) that
   made the API server reject image policies. In
   [PipeCD](https://github.com/pipe-cd/pipecd/pull/6979) I fixed a cancel race
   that ran rollback in parallel with the next stage, and a
   [leaked clone](https://github.com/pipe-cd/pipecd/pull/7021) on every
   skip-stage check. Earlier, in the
   [GitLab Development Kit](https://gitlab.com/gitlab-org/gitlab-development-kit/-/merge_requests/5345),
   it meant false port conflicts between Nginx and Zoekt, among 25 merged
   merge requests.`,

  `Other things I have built include
   [Orbit Onboard](https://github.com/Ahmad-Faraj/orbit-onboard-aws), which ranks
   a codebase by call centrality to tell a new contributor what to read first;
   [Star Pupil](https://github.com/Ahmad-Faraj/star-pupil) and
   [Stet](https://github.com/Ahmad-Faraj/stet), two attempts at making study
   harder on purpose; a [Lox interpreter](https://github.com/Ahmad-Faraj/jlox) on
   the JVM; and an [operating system](https://github.com/Ahmad-Faraj/jack-os) for
   a 16-bit machine built up from NAND gates.`,

  `I compete. Twice an ACPC finalist, Meta Hacker Cup round two,
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
    orgNote: 'AI Analytics',
    title: 'Software Engineer',
    detail: 'Part-time',
    place: 'Berlin, Germany (remote)',
    from: 'Nov 2025',
    to: null,
    href: 'https://datajar.co/',
    points: [
      'Architected the agentic write path: the LLM proposes writes to Shopify, Meta, Zid and Salla, and a person approves each one before it is applied.',
      'Built explainable BI over chat: lineage for every figure, re-runs that cost no model calls, drill-through, and board packs.',
      'Hardened the LLM layer with DSPy-compiled prompts, eval suites, and provider failover that is aware of streaming responses.',
      'Owned eight OAuth commerce and ads integrations, and a connector layer that syncs 2,795 scripts across 143 providers.',
      'Closed a remote code execution hole in the analysis sandbox (pandas readers, a dunder walk); cut 1.6 s from cold start and 166 KB from 46 routes.',
    ],
  },
];

export const research = [
  {
    title: 'Installed, Launched, Probed',
    subtitle: 'An Execution-Based Conformance Census of the Model Context Protocol Registry',
    authors: 'A. Faraj',
    // Submitted on 27 Sep 2026, editor not yet assigned. "Submitted" is the
    // honest word until the journal says otherwise; not "under review".
    venue: 'Submitted to Empirical Software Engineering (Springer)',
    date: 'Sep 2026',
    pdf: 'Faraj-2026-MCP-conformance-census-preprint.pdf',
    thumb: 'paper-p1.jpg',
    abstract: `The Model Context Protocol connects LLM agents to external tools, and
               public registries now list tens of thousands of servers. This census
               launches every one of the 6,106 locally installable servers in the
               official registry in an isolated sandbox and sends each an unknown
               tool name, an argument of the wrong type and a malformed frame. Only
               63.5% start and complete a handshake, and the deviations that follow
               trace to SDK defaults rather than to server authors.`,
    // `[label](url)` is rendered by md(); everything else is escaped.
    points: [
      'Executed all 6,106 installable servers (of 17,432 registry entries) in Docker sandboxes; only 63.5% (95% CI 59.9–66.5) start and complete a handshake.',
      'Disclosed to 15 maintainers: six fixed their servers and three reproduced the failure independently, among them [GoReleaser #62](https://github.com/goreleaser/mcp/pull/62) and [StackQL #702](https://github.com/stackql/stackql/pull/702).',
      'Traced an 88.4% unknown-tool deviation to SDK defaults, and supplied the first field data to spec proposal [SEP-2145](https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2145#issuecomment-5142039121).',
      'Found silent execution: 3.5% of servers run a tool on arguments their own schema rejects and return an ordinary result ([TypeScript SDK #2628](https://github.com/modelcontextprotocol/typescript-sdk/issues/2628)).',
      'Surfaced a stdio transport crash in the official Go SDK; its bug report credits this study ([go-sdk #1209](https://github.com/modelcontextprotocol/go-sdk/issues/1209)).',
    ],
    // Order matters: v1, v3 and v5 link the title to [0], v3 labels [1] as SEP-2145.
    artifacts: [
      { label: 'doi',             href: 'https://doi.org/10.5281/zenodo.22996025' },
      { label: 'SEP-2145',        href: 'https://github.com/modelcontextprotocol/modelcontextprotocol/pull/2145#issuecomment-5142039121' },
      { label: 'data',            href: 'https://doi.org/10.5281/zenodo.22981443' },
      { label: 'Harness',         href: 'https://github.com/Ahmad-Faraj/mcp-conformance' },
    ],
  },
];

/**
 * `state` is rendered verbatim. Keep it truthful. Re-checked on GitHub 3 Nov 2026.
 * `role`, `roleHref` and `code` are optional; `code` is the bold short name in
 * the entry line and defaults to the org name, lowercased.
 */
export const openSource = [
  {
    org: 'Kubeflow',
    note: 'CNCF, ML on Kubernetes',
    role: 'Org member',
    roleHref: 'https://github.com/kubeflow/internal-acls/pull/982',
    from: 'Sep 2026',
    to: null,
    href: 'https://github.com/search?q=is%3Apr+author%3AAhmad-Faraj+org%3Akubeflow&type=pullrequests',
    items: [
      {
        ref: 'mcp-server#282', state: 'merged',
        href: 'https://github.com/kubeflow/mcp-server/pull/282',
        text: 'Made failed MCP tool calls return isError to clients instead of reporting success.',
      },
      {
        ref: 'mcp-server#233', state: 'merged',
        href: 'https://github.com/kubeflow/mcp-server/pull/233',
        text: 'Made the MCP server accept the dotted torchtune runtime names that Trainer ships.',
      },
      {
        ref: 'trainer#4333', state: 'merged',
        href: 'https://github.com/kubeflow/trainer/pull/4333',
        text: 'Fixed a nil dereference in Trainer’s MPI plugin and extended the test that let it through.',
      },
    ],
  },
  {
    org: 'Kyverno',
    note: 'CNCF, Kubernetes policy engine',
    role: 'Contributor',
    from: 'Sep 2026',
    to: null,
    href: 'https://github.com/search?q=is%3Apr+author%3AAhmad-Faraj+repo%3Akyverno%2Fkyverno&type=pullrequests',
    items: [
      {
        ref: 'kyverno#17641', state: 'merged',
        href: 'https://github.com/kyverno/kyverno/pull/17641',
        text: 'Made PolicyException updates reach namespaced CEL policies at once, across three policy controllers.',
      },
      {
        ref: 'kyverno#17558', state: 'merged',
        href: 'https://github.com/kyverno/kyverno/pull/17558',
        text: 'Fixed colliding webhook names that made the API server reject image validating policy webhooks.',
      },
      {
        ref: 'kyverno#17560', state: 'merged',
        href: 'https://github.com/kyverno/kyverno/pull/17560',
        text: 'Fixed invalid JUnit XML from kyverno test when a failure had no detailed results.',
      },
      {
        ref: 'kyverno#17581', state: 'merged',
        href: 'https://github.com/kyverno/kyverno/pull/17581',
        text: 'Truncated event notes on a character boundary, so events are no longer rejected for splitting a UTF-8 character.',
      },
    ],
  },
  {
    org: 'PipeCD',
    note: 'CNCF, GitOps',
    role: 'Contributor',
    from: 'Jul 2026',
    to: null,
    href: 'https://github.com/search?q=is%3Apr+author%3AAhmad-Faraj+repo%3Apipe-cd%2Fpipecd&type=pullrequests',
    items: [
      {
        ref: 'pipecd#6979', state: 'merged',
        href: 'https://github.com/pipe-cd/pipecd/pull/6979',
        text: 'Stopped cancelled deployments from starting the next stage while rollback ran in parallel.',
        extra: { label: 'reported as #6978', href: 'https://github.com/pipe-cd/pipecd/issues/6978' },
      },
      {
        ref: 'pipecd#7021', state: 'merged',
        href: 'https://github.com/pipe-cd/pipecd/pull/7021',
        text: 'Stopped piped leaking a cloned repository on every skip-stage check.',
        extra: { label: 'pipedv1: #7275', href: 'https://github.com/pipe-cd/pipecd/pull/7275' },
      },
      {
        ref: 'pipecd#7040', state: 'merged',
        href: 'https://github.com/pipe-cd/pipecd/pull/7040',
        text: 'Added the pipectl application enable command.',
      },
      {
        ref: 'pipecd#6981', state: 'merged',
        href: 'https://github.com/pipe-cd/pipecd/pull/6981',
        text: 'Fixed group-mention lookup so failed-deployment Slack alerts reach the right on-call group.',
      },
    ],
  },
  {
    org: 'Other CNCF',
    code: 'cncf',
    note: 'Karmada, KubeStellar, kured, Vitess, ORAS',
    from: 'Jun 2026',
    to: null,
    // /search, not /pulls; the latter 404s for logged-out visitors.
    href: 'https://github.com/search?q=is%3Apr+author%3AAhmad-Faraj+-user%3AAhmad-Faraj&type=pullrequests',
    items: [
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
        ref: 'kubestellar#3870', state: 'diagnosis',
        href: 'https://github.com/kubestellar/kubestellar/issues/3870',
        text: 'Root-caused ServiceAccount secrets never reaching edge clusters to a metadata-only apply path in library-go, on someone else’s bug report.',
      },
      {
        ref: 'kured#1372', state: 'merged',
        href: 'https://github.com/kubereboot/kured/pull/1372',
        text: 'Validated the sentinel file path in NewFileRebootChecker instead of failing later at reboot time.',
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
    ],
  },
  {
    org: 'GitLab',
    note: 'Development Kit, main repo',
    role: '25+ merged MRs',
    from: 'Sep 2025',
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
    code: 'hyperledger',
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
    line: "Ranks a codebase's 13K+ definitions by call centrality to tell a new contributor what to read first; serverless on AWS.",
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
    name: 'Star Pupil',
    line: 'A student that believes exactly what you teach it, then sits an exam; every lost mark traces back to a sentence in your lesson.',
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
    line: 'Plants misprints in your own notes, sets them as a galley proof, and hands you the red pencil.',
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
    name: 'jlox',
    line: 'A tree-walking interpreter for the Lox language on the JVM, with a resolver pass for closures and lexical scope.',
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
    line: 'An operating system for the 16-bit Hack computer, built up from NAND gates through a stack VM.',
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
      'GPA 3.60 / 4.00, ranked 2nd in class, Academic Excellence Award twice.',
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
      { text: 'ACPC Finalist twice; in 2025, 84th at the Arab Collegiate Programming Contest, 59th at ECPC, 1st in university.', date: 'Aug 2025', href: 'https://icpc.global/ICPCID/XRR2FB1ZXTL5', hrefLabel: 'ICPC' },
      { text: 'Meta Hacker Cup: Round 2 finalist, 1,480 of 5,972.', date: 'Oct 2025', href: 'https://www.facebook.com/codingcompetitions/hacker-cup/2025/certificate/3769267336631460', hrefLabel: 'Meta' },
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
    href: 'https://drive.google.com/drive/folders/1XlCenHTWToYcKzHPidy9hajvtp5jD1L0?usp=sharing', hrefLabel: 'Sessions',
  },
  {
    text: 'CP-Template: competitive programming templates and references used by the SCU team.',
    href: 'https://github.com/Ahmad-Faraj/CP-Template', hrefLabel: '13 stars',
  },
];

export const skills = [
  { group: 'Languages and frameworks', items: ['Go', 'Python', 'TypeScript', 'C/C++', 'Java', 'SQL', 'NestJS', 'FastAPI', 'React', 'Next.js'] },
  { group: 'MLOps and AI',             items: ['Distributed training on Kubernetes', 'LLM agents', 'RAG', 'LangChain', 'vector databases', 'MCP', 'DSPy'] },
  { group: 'Cloud and infrastructure', items: ['AWS', 'GCP', 'Kubernetes', 'Docker', 'Terraform', 'CI/CD', 'Linux', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka'] },
  { group: 'Daily driver',             items: ['Neovim', 'tmux', 'git'] },
];

/** Small numbers worth stating plainly. Used by versions that show a header strip. */
export const facts = [
  { k: '6,106', v: 'MCP servers executed' },
  { k: '15',    v: 'merged CNCF pull requests' },
  { k: '2nd',   v: 'in class, GPA 3.60' },
  { k: '3,000+',v: 'problems solved' },
];
