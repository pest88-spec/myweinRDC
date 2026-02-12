# 实现计划：教育工作者执照证书生成器

## 概述

为 Payslip Generator 应用新增 `educatorLicense` 文档类型，按照现有架构模式逐步实现：状态定义 → 渲染器 → 编辑器 → 导航集成 → 导出支持 → 随机数据 → 测试。

## 任务

- [x] 1. 定义状态数据与核心渲染器
  - [x] 1.1 在 `initialState.js` 中添加 `educatorLicense` 默认状态
    - 在 `INITIAL_STATE` 对象中新增 `educatorLicense` 字段，包含 stateName、departmentName、licenseType、licenseeName、licenseNumber、issueDate、validFrom、validTo、teachingAreas 数组、renewalRequirements、certificateNumber、signatories 数组
    - 提供完整的默认值，确保初始渲染即可生成视觉完整的证书
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 创建 `EducatorLicenseRenderer.jsx` 渲染器组件
    - 在 `src/components/renderers/` 下创建新文件
    - 实现装饰性双线边框容器
    - 实现哥特式字体州名标题 + 部门名称 + 执照类型副标题
    - 实现被授权人姓名（粗体大写居中）
    - 实现执照信息区（编号、签发日期、有效期）
    - 实现授权正文段落
    - 实现教学领域列表（含缩进背书项）
    - 实现续期要求文本
    - 实现红色证书编号（底部居中）
    - 实现双签名栏（左右布局）
    - 处理 teachingAreas 为空数组的边界情况
    - 处理 signatories 数组长度不足的边界情况
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 7.1, 7.3_

  - [x] 1.3 编写 EducatorLicenseRenderer 属性测试
    - **Property 4: 渲染器字段完整性**
    - 使用 fast-check 生成随机有效 educatorLicense 状态对象
    - 验证所有标量字段值、教学领域名称、背书字符串、签名人信息均出现在渲染输出中
    - **Validates: Requirements 3.3, 3.4, 3.5, 3.7, 3.8, 3.9, 3.10, 3.11, 7.1**

  - [x] 1.4 编写 EducatorLicenseRenderer 单元测试
    - 测试默认状态渲染不崩溃
    - 测试 teachingAreas 为空数组时正常渲染
    - 测试 signatories 缺失时的回退行为
    - _Requirements: 7.3_

- [x] 2. 编辑器与导航集成
  - [x] 2.1 在 `Editor.jsx` 中添加 educatorLicense 编辑区域
    - 添加 `docType === 'educatorLicense'` 条件渲染块
    - 实现所有文本/日期输入字段
    - 实现教学领域动态列表（添加/删除/编辑 area 和 endorsements）
    - 实现签名人编辑（两组 name + title 输入）
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [x] 2.2 在 `Preview.jsx` 中注册 EducatorLicenseRenderer
    - 导入 EducatorLicenseRenderer
    - 在 rendererMap 中添加 `educatorLicense` 映射
    - _Requirements: 5.1, 5.2_

  - [x] 2.3 在 `App.jsx` 中添加导航按钮和状态支持
    - 在导航栏中添加 "Educator License" 按钮
    - 设置 aria-current 属性
    - 确保 educatorLicense 状态通过 handleChange 正确更新
    - 处理 teachingAreas 数组的增删操作（复用 handleArrayChange/addArrayItem/removeArrayItem 或添加嵌套处理逻辑）
    - _Requirements: 4.1, 4.2, 4.3_

  - [x] 2.4 编写编辑器可见性属性测试
    - **Property 2: 编辑器区域可见性**
    - 使用 fast-check 从非 educatorLicense 的 docType 集合中随机选择
    - 验证 Educator License 编辑区域不显示
    - **Validates: Requirements 2.2**

  - [x] 2.5 编写教学领域增删往返属性测试
    - **Property 3: 教学领域增删往返**
    - 使用 fast-check 生成随机教学领域列表
    - 验证添加后删除恢复原始列表
    - **Validates: Requirements 2.4, 2.5**

- [x] 3. 检查点 - 确保所有测试通过
  - 确保所有测试通过，如有问题请告知用户。

- [x] 4. 导出支持与随机数据
  - [x] 4.1 更新 `pdfExport.js` 支持 educatorLicense 导出
    - 在 `exportToZip` 的 `allDocTypes` 数组中添加 `'educatorLicense'`
    - 在 `docLabels` 中添加 `educatorLicense: 'Educator_License'`
    - PDF 按钮点击时复用 `exportPayslipToPdf` 通用逻辑
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 4.2 在 `randomData.js` 中添加 educatorLicense 随机数据生成
    - 定义州名、执照类型、教学领域、背书等数据池
    - 在 `generateRandomData` 返回对象中添加 `educatorLicense` 字段
    - 生成随机但合理的日期范围、执照编号、签名人等
    - _Requirements: 1.3_

  - [x] 4.3 编写随机数据生成属性测试
    - **Property 1: 随机数据生成有效性**
    - 使用 fast-check 的 `assert` 多次调用 `generateRandomData()`
    - 验证返回的 educatorLicense 包含所有必需字段、非空值、正确的数组结构
    - **Validates: Requirements 1.3**

- [x] 5. App 导航测试与最终集成
  - [x] 5.1 在 `App.test.jsx` 中追加 Educator License 导航测试
    - 测试 "Educator License" 按钮存在
    - 测试点击后 aria-current="page" 激活
    - 遵循现有测试文件中 Document Type Rendering 的模式
    - _Requirements: 4.1, 4.2, 4.3_

- [x] 6. 最终检查点 - 确保所有测试通过
  - 确保所有测试通过，如有问题请告知用户。

## 备注

- 标记 `*` 的子任务为可选，可跳过以加速 MVP 交付
- 每个任务引用了具体的需求编号以确保可追溯性
- 属性测试验证跨所有输入的通用正确性属性
- 单元测试验证具体示例和边界情况
