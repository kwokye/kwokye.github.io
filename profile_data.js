const PROFILE_DATA = {
  // ------------------------------------------------------------------------
  // 1. 个人基本资料
  // ------------------------------------------------------------------------
  name: "Lin Guo",
  chineseName: "郭林",
  title: "Ph.D. Researcher in Mechanical and Manufacturing Engineering (Robotics)",
  affiliation: "Intelligent Automation Centre (IAC), Loughborough University, UK",
  affiliationUrl: "https://www.lboro.ac.uk/schools/meme/research-and-innovation/research-groups/intelligent-automation/",

  // 个人头像图片路径：
  // 如果你有个人照片，将照片放到根目录并命名为 avatar.jpg，这里写 "avatar.jpg"
  // 如果留空 "" 则自动显示极简灰色学者图标
  avatar: "avatar.png",

  // ------------------------------------------------------------------------
  // 2. 学术与社交链接 (如果不想要某一项，直接留空 "" 即可，网页会自动隐藏)
  // ------------------------------------------------------------------------
  links: {
    googleScholar: "https://scholar.google.com/citations?user=sMfGvc4AAAAJ&hl",
    linkedIn: "https://www.linkedin.com/in/lin-lboro/",
    email: "mailto:l.guo2@lboro.ac.uk", // 替换为你的真实邮箱
    gitHub: "https://github.com/kwokye",
    cv: "#", // 可填写你的简历 PDF 链接或本地 "cv.pdf"
  },

  // ------------------------------------------------------------------------
  // 3. 个人简介 (Bio)
  // 每一行是一个段落，支持在文字里加粗 <strong> 或放链接 <a>
  // ------------------------------------------------------------------------
  bio: [
    "I am currently a Ph.D. researcher in Mechanical and Manufacturing Engineering (Robotics) at the <a href='https://www.lboro.ac.uk/schools/meme/research-and-innovation/research-groups/intelligent-automation/' target='_blank' class='text-zinc-900 dark:text-white font-medium underline hover:text-sky-600'>Intelligent Automation Centre (IAC)</a>, <strong>Loughborough University</strong>, United Kingdom.",
    "My doctoral research is focused on <strong>autonomous in-situ metrology systems of complex freeform surfaces with mobile robotic platforms in large-scale advanced manufacturing</strong>.",
    "Prior to joining Loughborough, I received my M.Eng. and B.Eng. degrees from Southwest University of Science and Technology. My previous research investigated <strong>multi-sensor fusion (LiDAR, UWB, RFID, Vision)</strong>, <strong>reconfigurable multi-robot formation control</strong>, and <strong>human-robot collaboration (HRC)</strong>."
  ],

  // ------------------------------------------------------------------------
  // 4. 核心研究方向 (Research Interests)
  // ------------------------------------------------------------------------
  researchInterests: [
    "Robotics & Autonomous Metrology",
    "Fringe Projection Profilometry",
    "SLAM",
    "Multi-Sensor Fusion",
    "Multi-Robot Collaboration",
    "Human-Robot Interaction (HRI)"
  ],

  // ------------------------------------------------------------------------
  // 5. 最新动态 (News & Updates)
  // ------------------------------------------------------------------------
  news: [
    {
      date: "[10/2025]",
      content: "🎓 Commenced my Ph.D. research in Robotics at the <strong>Intelligent Automation Centre (IAC)</strong>, Loughborough University."
    },
    {
      date: "[02/2025]",
      content: "📄 Our paper on <em>Target Localization and Following Based on LiDAR and Ultra-Wideband Ranging with Consideration of Target Visibility</em> was accepted in <strong>IEEE IROS 2025</strong>."
    },
    {
      date: "[06/2024]",
      content: "🎓 Successfully graduated with my Master's Degree in Control Science and Engineering from Southwest University of Science and Technology."
    },
    {
      date: "[03/2024]",
      content: "📄 Our paper on <em>Reconfigurable Multi-Robot Formation via Ultra-Wideband Ranging in Unknown Environments</em> was published in <strong>IEEE Control Systems Letters (L-CSS)</strong>."
    },
    {
      date: "[12/2023]",
      content: "🎤 Presented our work on <em>Moving Object Localization based on UWB & LiDAR Fusion</em> at <strong>IEEE ROBIO 2023</strong>."
    }
  ],

  // ------------------------------------------------------------------------
  // 6. 精选学术论文 (Selected Publications)
  // 【新增论文】：直接复制一个 { ... } 粘贴到列表最前面，修改对应文字即可
  // ------------------------------------------------------------------------
  publications: [
    {
      title: "Target Localization and Following Based on LiDAR and Ultra-Wideband Ranging with Consideration of Target Visibility",
      authors: "<strong>Lin Guo</strong>, Ran Liu, Zhiqiang Cao, Chau Yuen, et al.",
      venue: "IEEE IROS 2025",
      venueDetail: "19 – 25 October, 2025, Hangzhou, China",
      links: [
        { label: "[IEEE Xplore]", url: "https://ieeexplore.ieee.org/abstract/document/11246388" }
      ],
      bibtex: `@INPROCEEDINGS{11246388,
  author={Guo, Lin and Liu, Ran and Cao, Zhiqiang and Lau, Billy Pik Lik and Tan, U-Xuan and Yuen, Chau},
  booktitle={2025 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)}, 
  title={Target Localization and Following Based on LiDAR and Ultra-Wideband Ranging with Consideration of Target Visibility}, 
  year={2025},
  volume={},
  number={},
  pages={3336-3343},
  keywords={Location awareness;Laser radar;Accuracy;Linear programming;Distance measurement;Robustness;Trajectory;Quadrupedal robots;Robots;Ultra wideband technology},
  doi={10.1109/IROS60139.2025.11246388}}
`
    },
    {
      title: "Reconfigurable Multi-Robot Formation via Ultra-Wideband Ranging in Unknown Environments",
      authors: "<strong>Lin Guo</strong>, Ran Liu, Zhongyuan Deng, Yufeng Xiao",
      venue: "IEEE Control Systems Letters (L-CSS)",
      venueDetail: "Vol. 8, pp. 694–699, 2024",
      links: [
        { label: "[IEEE Xplore]", url: "https://ieeexplore.ieee.org/abstract/document/10461038" }
      ],
      bibtex: `@article{guo2024reconfigurable,
  title={Reconfigurable Multi-Robot Formation via Ultra-Wideband Ranging in Unknown Environments},
  author={Guo, Lin and Liu, Ran and Deng, Zhongyuan and Xiao, Yufeng},
  journal={IEEE Control Systems Letters},
  volume={8},
  pages={694--699},
  year={2024},
  publisher={IEEE},
  doi={10.1109/LCSYS.2024.3373763}
}`
    },
    {
      title: "基于激光与 UWB 序列匹配的目标跟踪 (Target Tracking Based on Sequence Matching of LiDAR and UWB)",
      authors: "<strong>郭林 (Lin Guo)</strong>, 刘冉 (Ran Liu), 蓝发籍 (Faji Lan), 邓天睿 (Tianrui Deng), 肖宇峰 (Yufeng Xiao)",
      venue: "控制与决策 (Control and Decision)",
      venueDetail: "Vol. 39, No. 8, pp. 2613–2621, 2024",
      links: [
        { label: "[Journal Paper]", url: "http://kzyjc.alljournals.cn/mhtml/2024/8/20240815.htm" }
      ],
      bibtex: `@article{guo2024targettracking,
  title={基于激光与UWB序列匹配的目标跟踪},
  author={郭林 and 刘冉 and 蓝发籍 and 邓天睿 and 肖宇峰},
  journal={控制与决策},
  volume={39},
  number={8},
  pages={2613--2621},
  year={2024},
  doi={10.13195/j.kzyjc.2023.0134}
}`
    },
    {
      title: "Moving Object Localization Based on the Fusion of Ultra-WideBand and LiDAR with a Mobile Robot",
      authors: "Muhammad Shalihan, Zhiqiang Cao, K. Pongsirijinda, <strong>Lin Guo</strong>, B. P. L. Lau, Ran Liu, Chau Yuen, U-X. Tan",
      venue: "IEEE ROBIO 2023",
      venueDetail: "IEEE International Conference on Robotics and Biomimetics",
      links: [
        { label: "[IEEE Xplore]", url: "https://ieeexplore.ieee.org/abstract/document/10354898" },
        { label: "[arXiv]", url: "https://arxiv.org/pdf/2310.10289" }
      ],
      bibtex: `@inproceedings{shalihan2023moving,
  title={Moving Object Localization Based on the Fusion of Ultra-WideBand and LiDAR with a Mobile Robot},
  author={Shalihan, Muhammad and Cao, Zhiqiang and Pongsirijinda, K and Guo, Lin and Lau, BPL and Liu, Ran and Yuen, Chau and Tan, U-X},
  booktitle={2023 IEEE International Conference on Robotics and Biomimetics (ROBIO)},
  pages={1--6},
  year={2023},
  organization={IEEE}
}`
    }
  ],

  // ------------------------------------------------------------------------
  // 7. 教育与科研履历 (Education & Experience)
  // ------------------------------------------------------------------------
  education: [
    {
      institution: "Loughborough University (拉夫堡大学)",
      logoBadge: "LU",
      badgeColor: "bg-purple-900 text-white",
      degree: "Doctor of Philosophy - PhD, Robotics / Mechanical and Manufacturing Engineering",
      subDetail: "Intelligent Automation Centre (IAC)",
      period: "Oct 2025 – Jun 2029"
    },
    {
      institution: "Southwest University of Science and Technology (西南科技大学)",
      logoBadge: "SWUST",
      badgeColor: "bg-sky-800 text-white",
      degree: "Master's Degree in Engineering, Control Science and Engineering",
      subDetail: "",
      period: "Sep 2021 – Jun 2024"
    },
    {
      institution: "Southwest University of Science and Technology (西南科技大学)",
      logoBadge: "SWUST",
      badgeColor: "bg-sky-800 text-white",
      degree: "Bachelor's Degree in Engineering, Electronic Information Engineering",
      subDetail: "",
      period: "Sep 2017 – Jun 2021"
    }
  ],

  // ------------------------------------------------------------------------
  // 8. 学术服务与荣誉 (Services & Honors)
  // ------------------------------------------------------------------------
  services: {
    reviewers: [
      "Robotics and Automation Conferences (e.g. IEEE IROS / ICRA / ROBIO)"
    ],
    awards: [
      "National Scholarship (国家奖学金)"
    ]
  }
};
