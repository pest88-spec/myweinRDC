# 📄 美国 K-12 教育文档生成器

<div align="center">

![Deploy to GitHub Pages](https://github.com/pest88-spec/myweinRDC/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**专业的美国 K-12 教育文档生成工具，基于 React 和 Vite 构建**

即时创建、定制和导出工资单、税表、教师证、就业证明信等文档

[**🚀 在线演示**](https://pest88-spec.github.io/myweinRDC/)

</div>

---

## 📌 项目说明

本项目基于 [ThanhNguyxn/payslip-generator](https://github.com/ThanhNguyxn/payslip-generator) 进行深度优化和功能扩展，专注于美国 K-12 教育领域的文档生成需求。

> [!WARNING]
> **免责声明**：本项目仅供**教育和研究目的**使用。生成的文档为模拟文档，不得用于官方财务、法律或就业验证用途。

---

## ✨ 核心功能

### 📄 支持的文档类型（8 种）

| 文档类型 | 说明 |
|----------|------|
| **工资单 (Payslip)** | 完整的工资明细，包含收入、扣除、税款、雇主贡献 |
| **发票 (Invoice)** | 独立承包商发票 |
| **税表 (Tax Form)** | 税务预扣声明 |
| **W-2 表格** | 美国工资和税务报表 |
| **就业证明信 (Employment Letter)** | 正式的就业验证信函 ⭐ **新增优化** |
| **录用通知书 (Offer Letter)** | 职位录用通知及条款 |
| **教职员名录 (Faculty Listing)** | 学校网站教职员目录截图 |
| **教师证 (Educator License)** | 州教育委员会颁发的教师资格证书 ⭐ **全新功能** |

---

## 🎯 重大优化与新增功能

### 🆕 全新功能：教师资格证书 (Educator License)

完全按照伊利诺伊州真实教师证书样式设计，像素级还原官方证书：

#### 视觉设计
- **双层防伪边框**：外层微缩文字防伪条纹 + 内层 3.5px 黑色实线边框
- **红色证书编号**：右上角 Unica One 字体，26px，红色 (#cc0000)
- **标题层次**：
  - "STATE EDUCATOR..." - Arial Black 19px
  - "STATE OF ILLINOIS" - Arial Black 21px  
  - "CERTIFICATE" - Chivo Bold 38px，字间距 2px
- **三位签署人**：使用不同草书字体（Great Vibes、Dancing Script、Sacramento）
- **淡色水印**：州徽章浅色背景水印，防伪效果

#### 可编辑内容
- 州名称、部门名称、证书编号
- 持证人姓名、证书类型、颁发日期
- 有效范围（年级）
- 教学领域和背书（Teaching Areas & Endorsements）
  - 支持多个教学领域
  - 每个领域可添加多个背书（科目、年级、日期）
- 三位签署人姓名和职位
- 续期要求说明

#### 数据生成
- 随机生成 10 个美国州的教师证书数据
- 7 种证书类型（4年、5年、临时、永久等）
- 15 种教学领域（数学、英语、科学、特殊教育等）
- 10 种背书类型（轻度/中度、资优教育、阅读等）

### ⚡ 就业证明信优化 (Employment Letter)

完全重新设计，匹配正式学校信头样式：

#### 视觉优化
- **顶部信头**：居中上传的学校 logo + 学校名称（Georgia 24px 深红色）
- **装饰分隔线**：红色渐变线条 + "United States" 斜体文字
- **日期**：右对齐，自动设置为今天减 2 天
- **正式信函格式**：To Whom It May Concern 开头
- **员工信息表格**：标签-值对格式，清晰展示所有信息
- **底部签名区**：
  - 左侧：圆形学校印章（上传的 logo）
  - 右侧：手写签名（Mrs Saint Delafield 字体 28px）+ 签署人姓名和职位

#### 防伪底纹（三层）
1. **45度交叉细线纹理**：极浅蓝灰色菱形网格
2. **中心 logo 水印**：280px 超大超浅（4% 透明度）灰度 logo
3. **"OFFICIAL DOCUMENT" 文字水印**：35度倾斜排列的极浅蓝色文字

#### 新增可编辑字段
- Employment Status（雇佣状态）
- Telecommute（远程办公）
- Federal Tax Status（联邦税务状态）
- Last 4 SSN（SSN 后四位）
- Grade Level（年级）
- Subjects（科目）
- Signatory Name（签署人姓名）
- Signatory Title（签署人职称）

### 📊 数据库扩展

#### K-12 学校数据（从 7 所扩展到 30 所）
新增真实美国学校和学区：
- Houston ISD、Miami-Dade、Philadelphia School District
- Charlotte-Mecklenburg、San Diego Unified、Denver Public Schools
- Boston、Seattle、Portland、Minneapolis、Detroit、Atlanta
- San Francisco、Baltimore、Saint Ignatius College Prep
- Phillips Academy Andover、Thomas Jefferson High School
- Stuyvesant High School

所有学校包含真实的：
- 完整地址
- 电话号码
- 官方网站
- 学区名称
- 所在县

### 🎨 PDF 优化

- **文件大小优化**：从 PNG 改为 JPEG 格式（质量 0.82）
- **压缩模式**：启用 jsPDF FAST 压缩
- **体积缩减**：PDF 文件大小减少 60-70%
- **视觉质量**：几乎无损的视觉效果

### 🧪 测试覆盖

- **157 个测试用例**全部通过
- 包含属性测试（Property-Based Testing）
- 覆盖所有核心功能和边界情况

---

## 🛠️ 技术栈

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

| 技术 | 用途 |
|------|------|
| **React 18** | UI 组件框架 |
| **Vite 7** | 构建工具和开发服务器 |
| **Vitest** | 单元测试和属性测试 |
| **html2canvas** | DOM 转图片 |
| **jsPDF** | PDF 生成（优化为 JPEG） |
| **JSZip** | ZIP 文件创建 |
| **Google Fonts** | 专业字体（Unica One、Chivo、Mrs Saint Delafield 等） |

---

## 📁 项目结构

```
payslip-generator/
├── src/
│   ├── components/
│   │   ├── renderers/
│   │   │   ├── EducatorLicenseRenderer.jsx  # 教师证渲染器 ⭐ 新增
│   │   │   ├── EmploymentLetterRenderer.jsx # 就业信渲染器 ⭐ 优化
│   │   │   ├── PayslipRenderer.jsx
│   │   │   ├── TeacherCardRenderer.jsx
│   │   │   └── ...
│   │   ├── Editor.jsx           # 侧边栏编辑器
│   │   ├── Preview.jsx          # 文档预览
│   │   ├── PhotoUploader.jsx    # 照片上传
│   │   └── DynamicTable.jsx     # 动态表格
│   ├── constants/
│   │   └── initialState.js      # 初始状态（含教师证数据）
│   ├── data/
│   │   └── universities.js      # 13+ 所大学数据
│   ├── utils/
│   │   ├── calculations.js      # 计算工具
│   │   ├── pdfExport.js         # PDF/PNG/ZIP 导出（优化）
│   │   └── randomData.js        # 随机数据生成（扩展到 30 所学校）
│   ├── hooks/
│   │   └── usePersistentState.js # 持久化状态
│   └── App.jsx
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Pages 自动部署
├── index.html
└── package.json
```

---

## 🚀 快速开始

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/pest88-spec/myweinRDC.git
cd myweinRDC

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm test
```

### 部署到 GitHub Pages

项目已配置自动部署，推送到 `main` 分支后会自动触发部署。

手动部署：
```bash
npm run build
# 将 dist 文件夹内容部署到 GitHub Pages
```

---

## 📖 使用指南

### 快速上手
1. **选择文档类型** - 点击顶部标签：Payslip、Tax、W-2、Employment、Offer、Faculty、Educator License
2. **填写信息** - 使用左侧边栏输入公司、员工、工资信息
3. **上传 Logo** - 添加学校/公司 logo（可选）
4. **上传照片** - 添加教师照片（用于教师证）
5. **随机数据** - 点击 🎲 生成示例数据
6. **导出文档** - 点击 📥 导出为 PDF/PNG

### 教师资格证书使用
1. 选择 "Educator License" 标签
2. 填写基本信息（州名、证书类型、持证人姓名等）
3. 添加教学领域和背书：
   - 点击 "+ Add Teaching Area" 添加教学领域
   - 在每个领域下点击 "+ Add Endorsement" 添加背书
   - 填写科目、年级、日期
4. 编辑三位签署人的姓名和职位
5. 导出为 PDF

### 就业证明信使用
1. 选择 "Employment" 标签
2. 上传学校 logo（会显示在顶部和底部印章）
3. 填写员工信息（包含新增的 8 个字段）
4. 信件日期自动设置为今天减 2 天
5. 导出为 PDF（带防伪底纹）

---

## 🐛 故障排除

| 问题 | 解决方案 |
|------|----------|
| Logo 不显示 | 使用 PNG/JPG 格式，最大 2MB |
| 照片未导出 | 等待照片完全加载后再导出 |
| PDF 被截断 | 对于宽卡片使用横向模式 |
| 缩放不工作 | 尝试刷新页面 |
| 字体未加载 | 检查网络连接，Google Fonts 需要联网 |

---

## 🤝 致谢

本项目基于 [@ThanhNguyxn](https://github.com/ThanhNguyxn) 的 [payslip-generator](https://github.com/ThanhNguyxn/payslip-generator) 项目进行深度优化和扩展。

感谢原作者的开源贡献！

---

## 📝 许可证

MIT License - 可自由用于教育目的

---

## 🔗 相关链接

- **原始项目**：[ThanhNguyxn/payslip-generator](https://github.com/ThanhNguyxn/payslip-generator)
- **在线演示**：[https://pest88-spec.github.io/myweinRDC/](https://pest88-spec.github.io/myweinRDC/)
- **问题反馈**：[GitHub Issues](https://github.com/pest88-spec/myweinRDC/issues)

---

<div align="center">

**如果觉得这个项目有用，请给个 ⭐ Star！**

Made with ❤️ | 基于 [payslip-generator](https://github.com/ThanhNguyxn/payslip-generator) 优化扩展

</div>
