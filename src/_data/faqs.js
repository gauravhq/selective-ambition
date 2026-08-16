// Research-based FAQ. One source for both the rendered accordion and the FAQPage JSON-LD.
//
// GROUNDING RULE: every answer names a real, well-established concept (choice overload,
// attention residue, hedonic adaptation, self-determination theory, and so on). No invented
// statistics, no invented studies, no numbers presented as findings. Where a popular idea is
// contested (ego depletion, the ten thousand hours framing) the answer says so plainly.
// STYLE RULE: ASCII only. No em dashes, no en dashes, no curly quotes. Answers run 45 to 85
// words and answer the question in the first sentence.
// LINK RULE: `link` is only ever set to a post URL verified to exist in the built site.
const groups = [
  {
    id: "too-much-on",
    category: "Too much on your plate",
    items: [
      {
        q: "Why do I feel busy all the time but never feel like I am making progress?",
        a: "Because you are probably stretched across too many commitments, not short of hours. Task-switching costs mean every jump between projects leaves a bit of your attention behind, a pattern researchers call attention residue, so the effort goes into re-entry instead of output. Try holding one project as the day's main thread and letting the others wait a day rather than an hour.",
        link: "/blog/busy-versus-stretched/",
        linkText: "Busy versus stretched",
      },
      {
        q: "Why does my to-do list keep growing no matter how much I get done?",
        a: "Lists grow because capturing is easy and committing is hard. Every open loop keeps a claim on your mind, which is the Zeigarnik effect: unfinished tasks stay noisy until they are finished or deliberately closed. The fix is not a faster system but a smaller set of live promises. Close some items by deciding, on purpose, that you will not do them.",
      },
      {
        q: "How do I know if I am overcommitted?",
        a: "A good test is whether one unexpected event ruins your whole week. If a sick child, a delayed train, or an extra meeting collapses everything, you have no slack left, which points to role overload rather than poor planning. Look at what you promised, not at how you scheduled it. Remove a commitment before you rebuild the calendar.",
      },
      {
        q: "Why do I always underestimate how long things will take?",
        a: "Almost everyone does, and it has a name: the planning fallacy. We plan from a best-case story of the task and quietly ignore how similar tasks actually went, including the interruptions and the rework. The practical antidote is to look at your own history rather than your optimism, then leave room for the parts you cannot picture yet.",
      },
      {
        q: "Why do urgent little things always beat the work that actually matters?",
        a: "Because urgency is more seductive than importance. Research on the mere urgency effect finds that people pick tasks that feel time-pressured over tasks with a bigger payoff, even when the urgent one is worth less. Protect the important work by giving it a place on the calendar first, then let the urgent, low-value items wait in a batch.",
      },
      {
        q: "I keep saying yes to things and regretting it later. Why?",
        a: "Because a yes is cheap in the moment and expensive later. When you agree, the cost is abstract and sits in the future. When the day arrives, it is a real hour taken from something else. That gap is opportunity cost, and it stays invisible until it bites. Before you agree, name out loud what this yes will push out.",
        link: "/blog/every-yes-is-a-hidden-no/",
        linkText: "Every yes is a hidden no",
      },
      {
        q: "How many big goals should I actually have at once?",
        a: "Fewer than you think, and often only one that is truly live. Work on goal conflict shows that competing goals drain motivation and slow progress on all of them, because each one demands attention and justification. Keep a single goal in the foreground and put the rest on a shelf with a review date, so they are paused rather than abandoned.",
        link: "/blog/one-thing-seasons/",
        linkText: "One-thing seasons",
      },
      {
        q: "Why am I exhausted after a day where I did not do anything hard?",
        a: "Fragmentation is tiring even when nothing is difficult. Constant switching, small decisions, and half-open threads carry a real cognitive cost, and attention residue means you never fully arrive at any one thing. Look at how many separate contexts your day contained rather than how demanding each one was. Fewer contexts usually beats a better system.",
        link: "/blog/what-brain-fry-is/",
        linkText: "What brain fry is",
      },
      {
        q: "Is my problem time management or something else?",
        a: "Usually it is commitment management. Time management assumes the load is fixed and the schedule is broken; more often the load itself is too large, which is why every new system fails after a few weeks. That is the pattern behind what researchers call time famine, the feeling of never having enough hours. Cut promises first, then optimise what is left.",
      },
      {
        q: "Why does adding one more project seem to break everything?",
        a: "Because the cost of a new project is not just its own hours. It is the switching and coordination it adds to everything else. Each extra thread multiplies the handoffs in your head, and attention residue makes every return more expensive. A load that felt fine with three commitments can tip over at four. Remove one before you add one.",
      },
      {
        q: "How do I stop overcommitting when every request is reasonable?",
        a: "Judge requests against your existing load, not against their own merits. Almost every ask looks reasonable in isolation, which is exactly why isolated evaluation leads to overload. Keep a visible list of what you have already promised and treat it as fixed capacity. If something new gets in, something old has to come out.",
      },
      {
        q: "Why do I get so much done on the day before a holiday?",
        a: "A hard deadline shrinks the work. Parkinson's law describes how tasks expand to fill the time available, and a fixed cutoff strips out the polishing and second-guessing that quietly fill open-ended days. You can borrow the effect on purpose by giving work sessions a real end time instead of working until the thing feels finished.",
      },
    ],
  },
  {
    id: "saying-no",
    category: "Saying no without the guilt",
    items: [
      {
        q: "Why does saying no make me feel so guilty?",
        a: "Guilt shows up because a no registers as a threat to belonging, not just as a scheduling choice. Relatedness, one of the three basic needs in self-determination theory, explains why refusal feels like a social risk rather than an admin decision. The guilt is real but it is not evidence that you were wrong. Say no warmly, be clear, and let the discomfort pass.",
        link: "/blog/why-no-hurts/",
        linkText: "Why no hurts",
      },
      {
        q: "How do I say no without damaging the relationship?",
        a: "Be quick, be plain, and do not oversell your reasons. A short no delivered early respects the other person's planning far more than a slow maybe does. Long explanations invite negotiation and signal that your decision is still open. Decline the request, affirm the person, and skip the apology tour. Most people remember the clarity, not the refusal.",
        link: "/blog/practice-the-clean-no/",
        linkText: "Practice the clean no",
      },
      {
        q: "What do I say when I cannot say no to my boss?",
        a: "Trade instead of refusing. Rather than declining outright, show your current commitments and ask which one should move, which turns a refusal into a priority decision your manager owns. This is a conversation about capacity, not about willingness. It also makes the opportunity cost visible, and that is usually the information missing from the request.",
        link: "/blog/the-three-types-of-no/",
        linkText: "The three types of no",
      },
      {
        q: "Why do I say yes when I mean no?",
        a: "Because the yes buys immediate relief and the cost is deferred. In the moment, agreement removes friction and social discomfort, and the hour it will take belongs to a future version of you who feels abstract. Buy time instead: say you will check your commitments and reply tomorrow. A delayed answer is far more honest than a resented yes.",
      },
      {
        q: "Is it selfish to protect my time?",
        a: "No, and the framing hides what is really happening. Every yes is funded by something, usually your attention, your family, or your health, so protecting time is choosing where your care goes rather than withholding it. Autonomy, the sense that your actions are genuinely your own, is a basic psychological need and not a luxury. Guard it and you have more to give.",
      },
      {
        q: "How do I get out of a commitment I already agreed to?",
        a: "Leave early and cleanly rather than fading out. Tell the person directly, give a specific end date, and hand over what you can. Staying purely out of guilt is escalation of commitment, where past investment keeps you inside something you would never choose today. A clear exit costs one hard conversation; a slow drift costs months.",
      },
      {
        q: "What is a good script for turning down an invitation?",
        a: "Something short, warm, and final works best: thank them, decline plainly, and skip the excuse. You might say that you are keeping this season narrow and cannot join, but you are really glad they asked. Vague answers create follow-up and keep the decision open, which is worse for both of you. Clarity is the kindness here.",
      },
      {
        q: "Why do people push back when I set a boundary?",
        a: "Because a boundary changes an arrangement that used to work in their favour, and changed arrangements get tested first. Pushback is not proof that the boundary is wrong. It is the ordinary friction of renegotiating an expectation. Hold the same answer calmly a few times. Consistency, not argument, is what makes a boundary real.",
      },
      {
        q: "How do I say no to friends without feeling like a bad friend?",
        a: "Decline the event, not the friendship, and make the second part explicit. Say no to the date and then propose one specific thing you will do, and keep it. The social pain of feeling excluded is real, which is why a bare no lands hard on both sides. A concrete alternative signals that the relationship is intact even when the answer is not yes.",
        link: "/blog/the-cost-of-saying-no-to-a-friend/",
        linkText: "The cost of saying no to a friend",
      },
      {
        q: "Should I explain my reasons when I decline?",
        a: "A brief reason is fine; a long justification usually backfires. Detailed explanations turn a decision into a debate by handing over points to solve. Keep it to one line, and make that line about your commitments rather than about the value of their request. You are reporting a decision, not asking for permission to make it.",
      },
      {
        q: "What if saying no costs me an opportunity?",
        a: "It will, and that is the trade you are making on purpose. Every no closes something, but keeping every door open has its own price, paid in shallow effort spread across too many fronts. The real question is not whether you lose an option. It is whether the option you keep gets your full depth. Choose the loss you can live with.",
      },
    ],
  },
  {
    id: "fomo-and-jomo",
    category: "FOMO, JOMO, and missing out",
    items: [
      {
        q: "What is JOMO, the Joy of Missing Out?",
        a: "The Joy of Missing Out, JOMO, is the flip side of the fear of missing out. In Selective Ambition it is not a throwaway hashtag but a genuine way of choosing, working, and living: caring deeply about fewer things, and letting the rest go on purpose. It is the quiet joy of closing doors you were only keeping open just in case.",
        link: "/blog/what-jomo-actually-means/",
        linkText: "What JOMO actually means",
      },
      {
        q: "How do I stop feeling FOMO?",
        a: "Start by naming what you actually want, because the fear of missing out grows in the gap between your own goals and whatever happens to be visible. Research on FOMO ties it to unmet needs for connection and autonomy rather than to a shortage of events. Once you know what this season is for, most invitations stop reading as a loss.",
        link: "/blog/what-are-you-afraid-of-missing/",
        linkText: "What are you afraid of missing",
      },
      {
        q: "Is FOMO a real psychological thing or just a buzzword?",
        a: "It is a genuine, studied phenomenon and not only internet slang. Researchers describe the fear of missing out as a persistent worry that others are having rewarding experiences you are absent from, and link it to social media use, lower mood, and unmet psychological needs. Naming it helps, because it turns a vague restlessness into something you can actually work on.",
      },
      {
        q: "Why do I feel worse after checking what everyone else is doing?",
        a: "Because feeds serve you a filtered highlight reel and your mind treats it as a fair sample. Social comparison theory, set out by Leon Festinger, describes how we judge ourselves against others when there is no objective standard, and upward comparison reliably leaves people feeling worse. The problem is the input, not your character. Change what you look at.",
        link: "/blog/the-highlight-reel-that-got-you/",
        linkText: "The highlight reel that got you",
      },
      {
        q: "How is JOMO different from just missing out?",
        a: "The difference is that the choice is yours. Missing out passively leaves you with the feeling of exclusion; choosing to miss out turns the same absent evening into a decision that serves something you value. Autonomy, the sense of acting from your own reasons, is what separates the two. Same event skipped, completely different experience.",
      },
      {
        q: "Is JOMO just an excuse for avoiding things?",
        a: "It can be, and the difference is what you do with the time you save. Selective ambition means declining one thing so you can go deeper on another, so the no has a visible other side. Avoidance leaves an empty space and a relief that fades quickly. If you cannot name what your no is protecting, it is probably avoidance.",
      },
      {
        q: "Why do I keep my options open even when I know I should commit?",
        a: "Because open options feel like safety, though they quietly tax you. Keeping alternatives alive costs ongoing attention and comparison, and loss aversion makes closing any door feel like a loss even when the door leads nowhere you want to go. Give unused options an expiry date. An option you never exercise is a cost, not an asset.",
        link: "/blog/all-the-doors-at-once/",
        linkText: "All the doors at once",
      },
      {
        q: "How do I stop checking what my friends are doing without deleting everything?",
        a: "Change the defaults instead of relying on willpower. Move the app off your home screen, turn off notifications, and set a specific time to look rather than looking whenever you feel restless. That is an implementation intention, the kind of if-then plan Peter Gollwitzer studied, and such plans outperform vague resolve. The friction does the work for you.",
        link: "/blog/the-media-sabbath/",
        linkText: "The media sabbath",
      },
      {
        q: "Does missing out on news and trends hurt my career?",
        a: "Far less than you fear, and staying current is not the same as being informed. Most trend coverage is repeated within days by anyone who genuinely needs it, while depth compounds. Research on deliberate practice suggests that sustained, focused effort on a narrow skill is what builds real expertise. Depth is a stronger career asset than broad awareness.",
      },
      {
        q: "I chose to skip something and still felt bad. Why?",
        a: "Because a good decision can still feel like a loss, and both things are true at once. Loss aversion means what you gave up looms larger than what you kept, especially in the hours right after the choice. Judge the decision by what it makes possible across the season, not by how the evening felt.",
      },
    ],
  },
  {
    id: "too-many-options",
    category: "Too many options, too many decisions",
    items: [
      {
        q: "Why is it so hard to choose when I have lots of good options?",
        a: "More options make choosing harder, not easier. Research on choice overload finds that large assortments can leave people less likely to decide at all and less satisfied with whatever they pick, because every option carries the shadow of the ones rejected. Narrow the field before you evaluate: set a few criteria, cut to a short list, then choose.",
        link: "/blog/the-buffet-problem/",
        linkText: "The buffet problem",
      },
      {
        q: "Why am I never satisfied with what I chose?",
        a: "You may be maximising where satisficing would serve you better. The distinction is well established: maximisers search for the best possible option, satisficers take the first option that clears their standard, and maximisers often end up with objectively better outcomes while feeling worse about them. Set your standard in advance, then stop when something meets it.",
      },
      {
        q: "Is having more choice bad for us?",
        a: "Not inherently, but past a point it stops helping. Some choice supports autonomy and motivation. A great deal of it raises the cost of deciding, invites regret, and leaves people less content with what they picked. The useful move is not to have fewer opportunities in life. It is to keep fewer options live at any one time.",
      },
      {
        q: "How do I stop overthinking decisions?",
        a: "Decide in advance how you will decide. Most overthinking comes from evaluating every option against every criterion, which grows impossibly fast, so setting criteria and a cutoff first turns an open search into a closed one. Give small decisions a time limit, and treat good enough on your own criteria as the finish line rather than a compromise.",
      },
      {
        q: "Why do small decisions feel so draining by the end of the day?",
        a: "Because deciding has a cost even when each choice is minor. This is often called decision fatigue, though it is worth knowing that the strongest version of the idea, ego depletion, has struggled to replicate, so treat it as a useful description rather than a settled mechanism. Either way, fewer decisions helps. Automate the trivial ones and keep routines boring.",
        link: "/blog/the-decisions-are-the-tax/",
        linkText: "The decisions are the tax",
      },
      {
        q: "Should I keep exploring or commit to something?",
        a: "Explore deliberately for a set period, then commit. Endless exploring feels productive but never compounds, because depth requires staying long enough to get through the awkward middle. Give yourself a defined window to sample, decide with the information you have at the end of it, and treat committing as the point of the exercise rather than an unfortunate ending.",
      },
      {
        q: "How do I choose between two things I genuinely want?",
        a: "Accept up front that you are losing something real, then choose on fit rather than on maximum value. When two options are close, the gap between the outcomes is usually smaller than the cost of continued deliberation. Ask which one you can commit to wholeheartedly. A wholehearted second best beats a divided best almost every time.",
      },
      {
        q: "Why do I regret decisions I was happy with at the time?",
        a: "Because afterwards you compare your actual life with an imagined version of the road not taken, and imagined roads have no bad days. Counterfactual thinking makes the unchosen option look smoother than it would ever have been. Judge past choices by what you knew and wanted then, not against a fantasy that was never actually on offer.",
      },
      {
        q: "Does making a shortlist actually help?",
        a: "Yes, because it separates filtering from choosing. Choice overload comes from comparing too many things at once; a shortlist puts a hard cap on how many you examine in detail. Set your criteria, cut ruthlessly to a handful, then compare only those. The discarded options are gone for this decision, and that is exactly the point.",
      },
      {
        q: "How do I stop researching and just pick?",
        a: "Set the stopping rule before you start looking. Research can always continue, so without a cutoff it becomes a comfortable way to avoid committing. Decide what would be good enough and how long you will look, then choose when either condition is met. Perfect information is not available, and waiting for it is itself a decision.",
      },
    ],
  },
  {
    id: "comparison-and-social-media",
    category: "Comparison and social media",
    items: [
      {
        q: "Why do I feel behind even when I am doing well?",
        a: "Because you are measuring your ordinary days against other people's best moments. Social comparison theory describes how we evaluate ourselves against others whenever there is no absolute yardstick, and upward comparison with people who look ahead reliably lowers how we feel about our own progress. Choose your reference point on purpose: your own last year, not a stranger's highlight.",
        link: "/blog/when-did-you-last-feel-ahead/",
        linkText: "When did you last feel ahead",
      },
      {
        q: "Does social media actually make people unhappy?",
        a: "The honest answer is that it depends on how you use it. Passive scrolling and comparison-heavy use are more consistently linked with worse mood than active use for real connection, and the overall picture in the research is mixed rather than dramatic. Instead of arguing about averages, watch your own pattern: notice how you feel afterwards, then adjust the input.",
      },
      {
        q: "How do I stop comparing myself to people online?",
        a: "Curate the input rather than fighting the reflex. Comparison is largely automatic, so the practical lever is what reaches your eyes: unfollow the accounts that reliably leave you feeling behind, and keep the ones that do not. Think of it as an audit of what you allow into your head. You cannot suppress comparison, but you can change the sample.",
        link: "/blog/the-input-audit/",
        linkText: "The input audit",
      },
      {
        q: "Why does other people's success bother me even when I like them?",
        a: "Because comparison runs below your opinions of people. Upward comparison with someone similar to you is the most painful kind, since it feels like evidence about your own possible life rather than a fact about theirs. It says nothing about your affection for them. Notice the reaction, name it, then return to your own scoreboard.",
      },
      {
        q: "What is a healthy way to measure my own progress?",
        a: "Compare yourself with your past self on a small number of things you actually chose. Self-referenced progress supports competence, one of the basic psychological needs in self-determination theory, while ranking yourself against others is endless and shifts whenever the field shifts. Pick a few markers, review them on a fixed schedule, and ignore the leaderboard in between.",
        link: "/blog/check-your-scoreboard-monthly/",
        linkText: "Check your scoreboard monthly",
      },
      {
        q: "Why does everyone else seem to have it figured out?",
        a: "They do not. You are seeing their outputs and comparing them with your inputs. People publish results and keep the mess private, so the sample you see is filtered by design. That makes upward comparison feel like data when it is closer to advertising. Assume the struggle is there and simply not visible, because it almost always is.",
      },
      {
        q: "Should I quit social media entirely?",
        a: "You do not have to, and for many people narrower use works better than a clean break. Quitting outright solves comparison but can cost real connection, and relatedness is a basic psychological need rather than a nice extra. Try changing when and why you open the apps first: a set time, a specific purpose, notifications off. Quit if that fails.",
        link: "/blog/delete-the-app-not-the-account/",
        linkText: "Delete the app, not the account",
      },
      {
        q: "Why do I keep scrolling when I am not even enjoying it?",
        a: "Because the behaviour is cued and the rewards are unpredictable. Feeds run on intermittent reinforcement, where an occasional hit of something interesting sustains a habit far better than a reliable payoff would. Enjoyment is not what holds you there. Break the cue instead: take the app off your first screen and put something specific in the gap.",
      },
      {
        q: "How do I deal with comparison at work?",
        a: "Narrow what you compare and make it concrete. Vague ranking against colleagues produces anxiety without information; a specific gap, such as a skill you want, produces a plan. Upward comparison can motivate when it points at something learnable and can flatten you when it stays global. Turn they are ahead into they can do this thing, then decide whether you want it.",
        link: "/blog/the-colleague-who-got-promoted/",
        linkText: "The colleague who got promoted",
      },
      {
        q: "Is it normal to feel jealous of my friends?",
        a: "Yes, and it is more common with friends than with strangers. We compare most with people we see as similar to ourselves, so the closer someone sits to your own life, the sharper the comparison. Jealousy is information about what you want, not a verdict on your character. Ask what specifically stings, then decide whether it belongs in your plan.",
      },
      {
        q: "Why do I feel bad after looking at other people's holidays and homes?",
        a: "Because the images are curated and your reaction is not. What you see has been selected, edited, and stripped of cost and boredom, and comparison does not correct for any of that. Hedonic adaptation also means the people in those pictures got used to it far faster than you would imagine. Look less, and look at fewer people.",
      },
    ],
  },
  {
    id: "focus-and-attention",
    category: "Focus, attention, and depth",
    items: [
      {
        q: "Why can I not focus for more than a few minutes?",
        a: "Usually because your attention is being pulled by unfinished business and easy interruptions, not because something is wrong with you. Attention residue means part of your mind stays on the last task after you switch, so short intervals never let you settle. Remove the interruptions you control, give the work a longer block, and expect the opening stretch to feel slow.",
      },
      {
        q: "Is multitasking really that bad?",
        a: "For anything demanding, yes. What feels like multitasking is usually rapid switching, and every switch carries a cost in time and errors, which is well established in research on task switching. Genuine parallel work only happens when one of the tasks is automatic, like walking while talking. Batch similar work and do the hard thing on its own.",
        link: "/blog/the-hidden-tax-of-switching/",
        linkText: "The hidden tax of switching",
      },
      {
        q: "How do I get into flow more often?",
        a: "Set up the conditions rather than waiting for the mood. Flow, described by Mihaly Csikszentmihalyi, tends to appear when a clear goal, immediate feedback, and a challenge that slightly stretches your current skill come together without interruption. In practice that means one task, a defined outcome, and a protected block. Difficulty matters too: too easy is boring, too hard is anxious.",
        link: "/blog/what-full-attention-does/",
        linkText: "What full attention does",
      },
      {
        q: "What is attention residue?",
        a: "It is the part of your attention that stays stuck on a previous task after you have moved on. Studies of attention residue find that people do worse on the next task when the last one was left unresolved, particularly under time pressure. The practical remedy is to close a task properly, or note exactly where you will resume, before you switch.",
      },
      {
        q: "How long should a focus block be?",
        a: "Long enough to get past the settling-in period, which for most demanding work is more than a few minutes and less than a whole morning. The exact length matters less than the protection: one task, no notifications, and a clear stopping point. Try a length, notice where your attention actually breaks, and adjust from there instead of adopting somebody else's rule.",
      },
      {
        q: "Do notifications really damage my concentration?",
        a: "Yes, including the ones you ignore. An alert pulls attention, and the return trip carries attention residue, so the cost is much more than the seconds you spend glancing at it. Silencing notifications is one of the few changes that is both easy and large. Turn off everything that is not a person who needs you right now, and keep it off.",
      },
      {
        q: "Why does my brain feel fried after a normal work day?",
        a: "Because fragmented days drain you in a way that hard, single-focus days do not. Constant switching, background pings, and half-open loops all consume attention while producing very little, and none of it registers as effort at the time. Count the separate things your day touched. Reducing that count usually helps more than working harder or sleeping longer.",
        link: "/blog/a-brain-is-a-browser-with-ten-tabs/",
        linkText: "A brain is a browser with ten tabs",
      },
      {
        q: "How do I do deep work when my job is full of meetings?",
        a: "Defend one block rather than trying to reform the whole calendar. A single protected stretch, treated as a real appointment, is realistic in most jobs and is enough to move serious work forward. Meetings expand to fill available space, so an unprotected calendar will never leave you a gap by itself. Book the block first and let the rest arrange around it.",
      },
      {
        q: "Does listening to music help me concentrate?",
        a: "It depends on the task and the music. Lyrics compete with language-heavy work such as writing or editing, while familiar instrumental music can help by masking a noisy environment. There is no single right answer in the research, so test it on your own hard tasks rather than assuming. Treat silence as the default for anything verbal.",
      },
      {
        q: "Why do I check my phone without deciding to?",
        a: "Because it is a cued habit rather than a decision. Habits fire from context, so a phone within reach plus a moment of boredom is enough to start the sequence before intention arrives. Willpower is a poor tool against cues. Change the context instead: leave the phone in another room while you work, and give your hands something else to do.",
      },
      {
        q: "How do I stop context-switching between projects?",
        a: "Assign projects to days or half-days instead of interleaving them. Task-switching costs and attention residue both scale with how often you move, so the aim is fewer transitions rather than faster ones. Batch anything that shares a context. If no project can wait a day, that is worth knowing too, because it means the load itself is too high.",
        link: "/blog/dont-parallelize-because-you-can/",
        linkText: "Do not parallelize because you can",
      },
    ],
  },
  {
    id: "burnout-rest-and-guilt",
    category: "Burnout, rest, and guilt",
    items: [
      {
        q: "Am I burned out or just tired?",
        a: "Tiredness lifts after rest; burnout does not. The most widely used description of burnout, developed by Christina Maslach, has three parts: exhaustion, cynicism or detachment from the work, and a sense that you are no longer effective. If the second and third are present, a holiday is not the answer. What needs to change is the load and the control you have over it.",
        link: "/blog/burnout-is-a-loss-of-agency/",
        linkText: "Burnout is a loss of agency",
      },
      {
        q: "Why do I feel guilty when I rest?",
        a: "Because rest has been recast as time stolen from output. Busyness works as a status signal in many workplaces and social circles, so idleness starts to feel like a claim that you are not serious. The guilt is a cultural reflex, not a fact about your obligations. Give rest a fixed place in the week and it stops needing a justification.",
        link: "/blog/the-rest-test/",
        linkText: "The rest test",
      },
      {
        q: "Will a holiday fix my burnout?",
        a: "Usually not on its own. A break relieves exhaustion for a while, but if the conditions that produced it are unchanged, the same state returns quickly. Burnout is closely tied to workload, control, fairness, and recognition, which makes it a mismatch between a person and a job rather than a personal failure of stamina. Change something structural, then rest.",
      },
      {
        q: "How much rest do I actually need?",
        a: "More than the minimum you can survive on, and of more than one kind. Restorative time is not only sleep: solitude, unstructured hours, real social contact, and time away from screens each repair something different. If you are sleeping enough and still feel depleted, you are probably short of a kind of rest that sleep cannot supply.",
        link: "/blog/seven-types-of-rest/",
        linkText: "Seven types of rest",
      },
      {
        q: "Why do I feel worse on holiday and then fine on the first day back?",
        a: "This is common, and the usual explanation is the sudden drop in demand rather than the holiday itself. Once the pressure lifts, everything you have been outrunning can arrive at once. Give the first stretch of any break permission to feel flat. If the whole break feels bad, that is a signal about the load you are returning to.",
      },
      {
        q: "Is doing nothing actually valuable?",
        a: "Yes, and it is not the same as procrastination. Unfocused time supports the mind wandering associated with consolidation and insight, and it is where a lot of thinking quietly finishes itself. The reason it feels wasteful is that it produces nothing visible, and visible output is what busyness culture rewards. Protect some of it anyway.",
        link: "/blog/boredom-is-the-space/",
        linkText: "Boredom is the space",
      },
      {
        q: "Why does taking a walk help me solve problems?",
        a: "Because stepping away lets a problem keep working without your supervision. Walking, especially outdoors, is consistently associated with better mood and more divergent, associative thinking, and it removes the screen that keeps you looping. Leave the phone behind, or at least the podcast. The benefit comes from the unfilled attention, not from the steps.",
        link: "/blog/why-a-walk-in-the-park-works/",
        linkText: "Why a walk in the park works",
      },
      {
        q: "How do I recover after a big project without immediately starting another?",
        a: "Plan the recovery before the project ends, or the next thing will take the space by default. Momentum plus an empty calendar reliably turns into another commitment. Block the week afterwards, name what it is for, and let the finished work settle. If stopping makes you anxious, that is worth examining rather than working around.",
      },
      {
        q: "Why do I feel like I have to earn my downtime?",
        a: "Because you have absorbed a rule that rest is a reward rather than a requirement. That rule is common in high-performing environments, where busyness signals worth, but it does not survive contact with how people actually work. Recovery is an input to good work, not a bonus paid out afterwards. Put it in the plan first.",
      },
      {
        q: "Can I be ambitious and still rest?",
        a: "Yes, and sustained ambition depends on it. The demanding, focused effort described in research on deliberate practice cannot be extended indefinitely, because it is limited by recovery. Treating rest as the opposite of ambition is exactly what produces the burnout cycle. Fewer commitments with proper recovery will beat more commitments at half strength over any real timescale.",
      },
      {
        q: "What are the early signs I am heading for burnout?",
        a: "Watch for cynicism arriving before the exhaustion peaks. Detachment from work you used to care about, irritation with people you actually like, and a creeping sense that your effort does not matter are the parts of burnout that show up before you collapse. Also watch for shrinking recovery: weekends that no longer restore you. Act on those, not on the crash.",
      },
    ],
  },
  {
    id: "ambition-and-enough",
    category: "Ambition, success, and enough",
    items: [
      {
        q: "Why do I feel empty after achieving something I wanted?",
        a: "This is common enough to have a name: the arrival fallacy, the belief that reaching a goal will deliver lasting satisfaction. Anticipation does much of the emotional work, so the moment itself is usually quieter than you expected. Notice it, mark the achievement deliberately, and choose the next thing from what you value rather than from the flatness.",
      },
      {
        q: "Why is nothing ever enough?",
        a: "Because you adapt. Hedonic adaptation, sometimes called the hedonic treadmill, describes how we drift back toward a familiar baseline of feeling after both good and bad events, so a new level quickly becomes the new normal. This is not greed and it is not a defect. It does mean that chasing the next level as a strategy for contentment will keep failing.",
        link: "/blog/the-treadmill-that-never-stops/",
        linkText: "The treadmill that never stops",
      },
      {
        q: "How do I know what I actually want, not what I am supposed to want?",
        a: "Look at what you would still choose if nobody could see it. A lot of what we call ambition is borrowed: we want things because the people around us want them, which social comparison makes nearly automatic. Ask which parts of the goal survive when the audience is removed. Whatever is left is the part worth building on.",
        link: "/blog/run-the-nobody-knew-test/",
        linkText: "Run the nobody knew test",
      },
      {
        q: "Is ambition bad?",
        a: "Not at all; the trouble is spreading it thin. Ambition aimed at a small number of things gives you depth, mastery, and the conditions for flow. Spread across everything, the same drive produces a full calendar and shallow results. The distinction is not between ambitious and unambitious people. It is between focused ambition and diffuse ambition.",
        link: "/blog/what-selective-ambition-means/",
        linkText: "What selective ambition means",
      },
      {
        q: "How do I define success without comparing to others?",
        a: "Write down what a good week looks like in your own terms, before you look at anyone else's results. External scoreboards move constantly and are always somebody else's design, while a self-defined standard supports competence and autonomy, both basic psychological needs. Review it on a schedule, and be honest when the standard drifted because of something you saw online.",
        link: "/blog/my-actual-scoreboard/",
        linkText: "My actual scoreboard",
      },
      {
        q: "Why does the goalpost keep moving?",
        a: "Because you move it as soon as you arrive. Adaptation resets your expectations to whatever you now have, so the target that once looked generous becomes the ordinary baseline. The way out is not to abandon goals but to decide in advance what will count as enough for this season, and then to notice out loud when you have reached it.",
        link: "/blog/the-goalpost-that-moves/",
        linkText: "The goalpost that moves",
      },
      {
        q: "What is the arrival fallacy?",
        a: "It is the mistaken belief that reaching a goal will produce lasting happiness. In practice the payoff is real but brief, and attention moves to the next target quickly. The useful response is not to give up on goals but to take more of your satisfaction from the work itself, which is where intrinsic motivation and flow actually live.",
      },
      {
        q: "Should I have a five year plan?",
        a: "A direction is useful. A detailed script often is not. Long plans assume stable preferences and predictable conditions, and the planning fallacy shows how badly we forecast even short projects. Hold a clear sense of what you are building toward, then commit hard to a much shorter season. Review, adjust, and let the plan earn its detail.",
      },
      {
        q: "Why do I want things I do not even enjoy once I have them?",
        a: "Because a lot of desire is copied. We take cues about what is valuable from the people around us, and social comparison makes their choices feel like evidence rather than preference. The test is the experience, not the acquisition. Notice which things you still enjoy a month later, and let that record guide the next want.",
        link: "/blog/we-want-what-others-want/",
        linkText: "We want what others want",
      },
      {
        q: "Is it too late for me to start something new?",
        a: "Almost certainly not, and the feeling usually comes from comparison rather than capability. Our sense of the right timeline is shaped by visible examples, which skew young because early success is more newsworthy. What matters far more is sustained, focused practice, and that is available at any age. The real constraint is how many other things you are carrying.",
        link: "/blog/the-uncle-who-started-painting-at-57/",
        linkText: "The uncle who started painting late",
      },
      {
        q: "How do I stop chasing the next thing?",
        a: "Decide what enough looks like while you are calm, and write it down. Because adaptation resets your baseline, a definition made in the middle of a chase will always sit higher than one made outside it. Then build in a review point instead of an endless climb. Ambition works best with a finish line you set yourself.",
        link: "/blog/the-enough-day/",
        linkText: "The enough day",
      },
    ],
  },
  {
    id: "career-and-work-pressure",
    category: "Career and work pressure",
    items: [
      {
        q: "Why do I feel like I have to look busy to be valued at work?",
        a: "Because in many workplaces visible busyness has become a signal of commitment. Where output is hard to observe, people signal effort instead, and long hours and a packed calendar are the easiest signals to send. That is a feature of the environment, not a fact about your worth. Where you can, make results visible so busyness does not have to speak for you.",
        link: "/blog/productivity-theater/",
        linkText: "Productivity theater",
      },
      {
        q: "Should I specialise or keep my options open?",
        a: "Specialise for a season, then reassess. Depth is what produces expertise, and research on deliberate practice points to sustained focused effort on a specific skill as the main driver, though the popular ten thousand hours framing overstates what the original work actually showed. Keeping every path open costs you the depth that makes any of them work.",
      },
      {
        q: "Is it a mistake to turn down a promotion?",
        a: "Not necessarily, and it is worth checking what the promotion actually contains. More money often arrives with more meetings, more coordination, and less of the work you are good at. Autonomy and competence, two of the basic psychological needs, predict how a job feels day to day better than the title does. Ask what your calendar looks like afterwards.",
      },
      {
        q: "How do I handle the pressure to have a side hustle?",
        a: "Notice that the pressure is mostly ambient rather than personal. Visible examples of people building things create a sense of obligation through comparison, and cheap AI tools have made the noise louder by making projects easier to start. A side project is worth doing when you want the thing itself. It is a poor cure for a job that is draining you.",
        link: "/blog/if-i-can-build-anything-i-should/",
        linkText: "If I can build anything, I should",
      },
      {
        q: "Why do I feel behind my peers in my career?",
        a: "Because you see their announcements and not their trade-offs. Comparison at work runs on public milestones, which arrive irregularly and get shared selectively, so everyone else's path looks smoother than your own. Pick a small number of markers you actually chose and track those. If a specific gap bothers you, turn it into a skill you can practise.",
      },
      {
        q: "Is it worth staying in a job I have outgrown because of what I have invested?",
        a: "Past investment is not a reason to stay. That is the sunk cost fallacy. Years spent, training completed, and reputation built are already spent whether you stay or go, and treating them as reasons is escalation of commitment. Decide from where you stand now: if you were arriving today, would you take this role? Answer that, then choose.",
      },
      {
        q: "How do I stop work from taking over my evenings?",
        a: "Give the evening a specific job, because empty time gets filled by whatever is loudest. Work expands into available space, and unclaimed hours are always available. Decide in advance what the evening is for and make it concrete. An if-then plan, of the kind Gollwitzer studied as an implementation intention, works far better than a general intention to log off.",
      },
      {
        q: "Why does my job feel meaningless even though it pays well?",
        a: "Pay is an external reward, and external rewards do not supply meaning on their own. Self-determination theory links sustained motivation to autonomy, competence, and relatedness, and a role can be well paid while starving all three. Look at which of the three is missing rather than negotiating salary. Often the fix is a change of scope, not of employer.",
        link: "/blog/workism/",
        linkText: "Workism",
      },
      {
        q: "How do I stop taking on my colleagues' work?",
        a: "Make ownership explicit instead of quietly absorbing the gap. In groups, individual effort tends to fall when responsibility is shared, a pattern known as social loafing, and a reliable person closing the gap turns into the new expectation. Name the owner and the deadline out loud. Letting something visibly slip once is often what resets things.",
      },
      {
        q: "Should I quit my job to fix my burnout?",
        a: "Not as a first move, unless the situation is unsafe. Burnout is strongly tied to workload, control, and recognition, so it is worth testing whether those can change where you are before you take on the risk of leaving. Try renegotiating scope, hours, or reporting first. If nothing moves after a genuine attempt, the answer gets much clearer.",
      },
    ],
  },
  {
    id: "quitting-and-letting-go",
    category: "Quitting, finishing, and letting go",
    items: [
      {
        q: "How do I know when to quit something?",
        a: "Ask whether you would start it today, knowing what you now know. If the answer is no, what is holding you is usually the sunk cost fallacy, our tendency to keep investing because of what has already been spent. Set a decision date and honest criteria in advance, before you are inside the emotion of it. Quitting on plan is not giving up.",
      },
      {
        q: "Why is it so hard to let go of a project I no longer care about?",
        a: "Because you already own it, and ownership changes how you value things. The endowment effect describes how we price what we hold above what we would pay for it, and a half-finished project gets the same protection. Add the identity you attached to it and the pull gets stronger still. Ask what the project would be worth to a stranger.",
      },
      {
        q: "What is the sunk cost fallacy in everyday life?",
        a: "It is continuing with something because of what you have already put in, rather than because of what it will give you. It shows up in unfinished books, courses you paid for, and commitments you have outgrown. Costs already paid cannot be recovered by suffering more of them. The only useful question is what the next hour actually buys.",
      },
      {
        q: "How do I let go of an old dream without feeling like a failure?",
        a: "Retire it deliberately rather than letting it rot quietly. Write down what it gave you and why it no longer fits, then name what you are choosing instead. The pain here is often about identity rather than the activity itself, because you built part of who you are on it. Marking the ending on purpose is what makes it a choice.",
        link: "/blog/a-small-death-of-a-possible-self/",
        linkText: "A small death of a possible self",
      },
      {
        q: "Is quitting a sign of weak character?",
        a: "No. Persistence is only a virtue when it is aimed at something you still want; the ability to stop is what makes strong commitment possible in the first place. Without it, every past decision becomes permanent and your capacity fills up with history. Escalation of commitment, not quitting, is the more common and more expensive mistake.",
      },
      {
        q: "How do I finish things instead of abandoning them halfway?",
        a: "Reduce the number of things you have started. Half-finished projects each keep a claim on your attention, which is the Zeigarnik effect, so a crowded shelf makes every single one harder to complete. Pick one, put the others formally on hold with a review date, and finish the chosen one before you release the next.",
      },
      {
        q: "What do I do with all the ideas I am not working on?",
        a: "Give them a shelf, not a to-do list. Writing an idea down and marking it explicitly parked closes the open loop that keeps it nagging, without pretending you will start it this month. Review the shelf on a fixed schedule. Most items look smaller later, and the few that keep pulling at you are the ones worth promoting.",
        link: "/blog/the-shelf-practice/",
        linkText: "The shelf practice",
      },
      {
        q: "How do I stop starting new things every few weeks?",
        a: "Put a delay between the idea and the start. Novelty is at its most persuasive on the first day, and starting is the part that feels good, which is why the pattern repeats. Write the idea down, wait a set period, and begin only if it still appeals once the excitement has faded. Most ideas will not survive the wait.",
      },
      {
        q: "Should I finish a book I am not enjoying?",
        a: "Usually not, and finishing out of duty is a small, clear case of sunk cost thinking. The money and the hours are already gone, and reading on does not recover them. There are exceptions, such as a difficult book that pays off later or one you need for work. Otherwise, stopping frees attention for something that earns it.",
      },
      {
        q: "How do I decide what to drop when everything feels important?",
        a: "Rank by what you would protect if you lost half your week, not by what looks valuable in isolation. Everything seems important on its own, and forced comparison is what reveals actual priority. Drop from the bottom, tell the people affected, and then hold the decision for a full season before you revisit it.",
        link: "/blog/when-everything-is-a-priority/",
        linkText: "When everything is a priority",
      },
    ],
  },
  {
    id: "family-friends-and-real-life",
    category: "Family, friends, and real life",
    items: [
      {
        q: "How do I make time for friends when life is already full?",
        a: "Make it recurring rather than occasional, because scheduled things survive a busy season and spontaneous ones do not. A standing time removes the negotiation that quietly kills plans. Relatedness, the need for close connection, is one of the basic psychological needs in self-determination theory, which is why this is not an optional item on the list.",
        link: "/blog/one-real-conversation-a-week/",
        linkText: "One real conversation a week",
      },
      {
        q: "Why do I feel stretched thin as a parent even when I am doing enough?",
        a: "Because role overload is about the number of roles pulling at once, not about how hard you try inside each one. When work, parenting, and everything else all carry full expectations, the conflict between them is the load. No amount of efficiency inside a role resolves a conflict between roles. Something usually has to be formally reduced, not just organised better.",
      },
      {
        q: "How do I be present with my family instead of thinking about work?",
        a: "Close the work loop before you walk in, even roughly. Attention residue means an unresolved task follows you home, so a two minute note of where you stopped and what comes next does more than willpower at the dinner table. Then put the phone somewhere else. Presence is mostly about removing the pull, not about trying harder.",
        link: "/blog/papa-youre-on-your-computer-again/",
        linkText: "Papa, you are on your computer again",
      },
      {
        q: "Why do my relationships feel shallow even though I know lots of people?",
        a: "Because breadth and depth trade off, and most of us keep too many light connections alive. Meaningful relationships need repeated, unhurried contact, which is exactly what a wide network makes impossible. Choose a small number of people to be genuinely present for. The rest can be warm acquaintances without any guilt attached.",
        link: "/blog/five-hundred-connections-no-friends/",
        linkText: "Five hundred connections, no friends",
      },
      {
        q: "Is it okay to have fewer friends?",
        a: "Yes, if the ones you have are close. What supports wellbeing is the depth and quality of connection rather than the size of the circle, and relatedness is met by being genuinely known, not by being widely contacted. A small number of real relationships, properly tended, does more for you than a broad network you cannot maintain.",
      },
      {
        q: "How do I protect family time from work creeping in?",
        a: "Make it a fixed appointment with a start and an end, then defend it like a client meeting. Work expands into unclaimed space, so time that is merely intended gets taken. Decide the boundary in advance and tell the people at work what it is. A stated boundary holds much better than one you defend case by case.",
      },
      {
        q: "Why do I feel guilty about time spent on myself?",
        a: "Because you are counting it against other people's claims on you rather than as part of what makes you good company. Guilt of this kind usually signals too many active obligations rather than a moral failing, and it rises with the number of roles you are trying to satisfy fully. Reduce the obligations instead of trying to feel differently about them.",
        link: "/blog/guilt-means-too-many-contracts/",
        linkText: "Guilt means too many contracts",
      },
      {
        q: "How do I handle family expectations about my career?",
        a: "Separate the relationship from the decision, and keep them separate in the conversation too. You can take their concern seriously without treating it as a vote. Pressure to follow a prescribed path can lead to identity foreclosure, where a commitment is adopted before it has ever been examined. Explain your reasoning once, then let time do the rest.",
      },
      {
        q: "What is one small change that gives me more real time with people?",
        a: "Put the phone in another room during shared meals. Presence is largely about removing the pull rather than adding effort, and a visible phone competes for attention even when it is silent. It is a small change with an unusually good ratio of effort to return. Start there before you redesign the whole week.",
      },
    ],
  },
  {
    id: "about-the-book",
    category: "About the book",
    items: [
      {
        q: "Is this an anti-ambition book?",
        a: "No. It is a book about selective ambition, not the absence of ambition. The aim is not to want nothing; it is to care deeply about fewer things and give them your full depth, instead of spreading yourself thin across every open door. It argues for choosing what matters, not for doing less for its own sake.",
      },
      {
        q: "Who is it for?",
        a: "For makers, strivers, parents, professionals, or anyone who feels the constant, low hum of \"not enough\" no matter how much they accomplish. If a life that looks full on paper still feels hollow to live, it was written for you.",
      },
      {
        q: "What if I cannot just quit my job?",
        a: "You do not have to. Most advice about slowing down assumes you can walk away, but a job, a family, or bills often mean you cannot. So the book offers the five per cent shift: one evening reclaimed, one meeting declined, one notification turned off for good, one project set down so the others can breathe. JOMO is most needed by the people who cannot simply quit.",
        link: "/blog/the-five-percent-shift/",
        linkText: "The five per cent shift",
      },
      {
        q: "Is it just another productivity system?",
        a: "No. It is not a productivity system and not a plan to cram more into your day. It argues for the opposite: caring about fewer things on purpose. The problem was never your discipline or your morning routine, but a world that hands you infinite options and calls the resulting exhaustion \"ambition\".",
      },
      {
        q: "Is it backed by research?",
        a: "Yes. Alongside hard-won personal experience, it draws on decades of research on attention, comparison, and choice, each source named and cited in the book. Among them: the paradox of choice, social comparison theory, hedonic adaptation, the science of social pain, flow, and burnout as a loss of agency.",
      },
      {
        q: "What is the five per cent shift?",
        a: "It is the smallest deliberate change you can make when quitting is not an option: one evening reclaimed, one meeting declined, one notification turned off for good. The point is that a small permanent change in what you allow beats a large plan you cannot sustain. Specific if-then plans of this kind are more reliable than a general intention to do less.",
        link: "/blog/pick-your-first-five-percent/",
        linkText: "Pick your first five per cent",
      },
      {
        q: "Do I have to read the book in order?",
        a: "Reading in order helps because the chapters build an argument, but the practical sections stand on their own. The book moves from the rush that wears us down, through the pause that wakes us up, to the choices that follow. If you want tools first, the input audit, the intentional no, and the five per cent shift can be used straight away.",
        link: "/blog/a-book-for-people-with-jobs/",
        linkText: "A book for people with jobs",
      },
      {
        q: "Is this book only for people in corporate or tech jobs?",
        a: "No. The pressure it describes comes from having more options than attention, which reaches anyone with a phone and a full life. Parents, students, freelancers, and people in caring roles often feel it most sharply, because their commitments are the least negotiable. The examples vary, but the underlying problem of too many open doors is the same.",
        link: "/blog/dont-tell-constrained-people-to-think-bigger/",
        linkText: "Do not tell constrained people to think bigger",
      },
    ],
  },
];

module.exports = { groups, all: groups.reduce((acc, g) => acc.concat(g.items), []) };
