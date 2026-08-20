# 🎓 Lin Guo's Academic Homepage (Markdown-Driven)

这是一个现代、轻量、模块化且由 **Markdown 驱动** 的个人学术主页。

网站内容与代码彻底解耦，所有的个人信息、动态、论文、经历与荣誉均存放在 `content/` 目录下的 `.md` 文件中。你无需修改任何 HTML 代码，只要编辑 Markdown 即可实时更新主页！

---

## 📁 目录结构

```text
kwokye.github.io/
│
├── content/                    # 📝 所有 Markdown 内容存放在这里
│   ├── profile.md              # 个人信息 (姓名/单位/联系方式/研究兴趣/Bio个人简介)
│   ├── news.md                 # 最新动态 (News & Updates)
│   ├── publications.md         # 精选学术论文 (Selected Publications)
│   ├── education.md            # 教育与工作履历 (Education & Experience)
│   └── services.md             # 学术服务与荣誉 (Services & Honors)
│
├── js/                         # ⚙️ 网站核心逻辑
│   ├── app.js                  # Markdown 动态加载与渲染器
│   └── theme.js                # 深色/浅色模式切换
│
├── avatar.png                  # 个人头像图片
├── index.html                  # 网站主页模板容器
├── preview.bat                 # Windows 一键本地预览（双击即可）
├── preview.py                  # 跨平台本地预览脚本 (Python)
└── README.md                   # 本说明文档
```

---

## 🚀 如何在本地预览修改

### 方法 1：Windows 双击一键预览（推荐）
直接在资源管理器中**双击 `preview.bat`**，它会自动启动本地服务器并在默认浏览器中打开主页。

### 方法 2：命令行启动
在终端中执行：
```bash
python preview.py
```
或：
```bash
python -m http.server 8000
```
然后打开浏览器访问 `http://127.0.0.1:8000`。

> 💡 **提示**：修改任何 `content/*.md` 文件后，保存并在浏览器中按 `F5` 刷新即可立即查看最新排版！

---

## ✍️ 各模块 Markdown 编写指南

### 1. 个人资料 (`content/profile.md`)
上方为 YAML 格式的元数据（姓名、职称、单位、头像、社交链接、研究兴趣），下方为正文简介（Bio）：
```markdown
---
name: Lin Guo
chineseName: 郭林
title: Ph.D. Researcher in Mechanical and Manufacturing Engineering (Robotics)
affiliation: Intelligent Automation Centre (IAC), Loughborough University, UK
affiliationUrl: https://www.lboro.ac.uk/schools/meme/research-and-innovation/research-groups/intelligent-automation/
avatar: avatar.png
links:
  googleScholar: https://scholar.google.com/citations?user=sMfGvc4AAAAJ&hl
  linkedIn: https://www.linkedin.com/in/lin-lboro/
  email: mailto:l.guo2@lboro.ac.uk
  gitHub: https://github.com/kwokye
  cv: "#"
interests:
  - Robotics & Autonomous Metrology
  - Fringe Projection Profilometry
  - SLAM
  - Multi-Sensor Fusion
---

这里是你的个人简介正文，可以使用 **加粗**、*斜体* 以及 [超链接](https://...)。
```

---

### 2. 最新动态 (`content/news.md`)
新增动态时，直接在文件最上方添加一行即可：
```markdown
- **[10/2025]** 🎓 Commenced my Ph.D. research in Robotics at the **Intelligent Automation Centre (IAC)**, Loughborough University.
- **[06/2024]** 🎓 Successfully graduated with my Master's Degree in Control Science and Engineering.
```

---

### 3. 精选学术论文 (`content/publications.md`)
新增论文时，直接复制以下模板粘贴在文件最上方：
```markdown
### 论文标题 (Paper Title)
- **Authors:** **Lin Guo**, Author Two, Author Three
- **Venue:** **IEEE IROS 2025**
- **VenueDetail:** 19 – 25 October, 2025, Hangzhou, China
- **Links:** [[IEEE Xplore](https://...)], [[arXiv](https://...)], [[Code](https://...)]
```bibtex
@article{guo2025,
  title={...},
  author={...},
  year={2025}
}
```
```

---

### 4. 教育与履历 (`content/education.md`)
```markdown
### Loughborough University
- **Degree:** Doctor of Philosophy - PhD, Robotics / Mechanical and Manufacturing Engineering
- **Period:** Oct 2025 – Jun 2029
- **Detail:** Intelligent Automation Centre (IAC)
- **Badge:** LU
- **BadgeColor:** bg-purple-900 text-white

### Southwest University of Science and Technology (西南科技大学)
- **Degree:** Master's Degree in Engineering, Control Science and Engineering
- **Period:** Sep 2021 – Jun 2024
- **Badge:** SWUST
- **BadgeColor:** bg-sky-800 text-white
```

---

### 5. 学术服务与荣誉 (`content/services.md`)
```markdown
### Academic Reviewer
- Robotics and Automation Conferences (e.g. IEEE IROS / ICRA / ROBIO)

### Selected Honors & Awards
- National Scholarship (国家奖学金)
```

---

## 🌐 部署到 GitHub Pages

1. 将所有文件提交并推送到 GitHub 仓库的 `main`（或 `master`）分支：
   ```bash
   git add .
   git commit -m "Update homepage content"
   git push origin main
   ```
2. 进入 GitHub 仓库设置 `Settings` -> `Pages`：
   - **Source**: 选择 `Deploy from a branch`
   - **Branch**: 选择 `main` / `root`
   - 点击 **Save** 保存。
3. 稍等片刻，即可通过 `https://kwokye.github.io/` 访问你的个人学术主页！
