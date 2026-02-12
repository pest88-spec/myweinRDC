# 需求文档：Payslip Generator 全面优化

## 简介

本文档定义了 Payslip Generator 项目全面优化的需求。基于架构审计发现的问题，涵盖组件拆分、货币格式统一、教师卡功能完善、测试修复、数据持久化、表单验证、导出功能改进、照片上传、无障碍改进和代码复用等方面。

## 术语表

- **Preview_Component**: 文档预览面板，负责渲染所有文档类型的可视化输出
- **Document_Renderer**: 单个文档类型的独立渲染组件（如 PayslipRenderer、InvoiceRenderer 等）
- **Currency_Formatter**: 统一的货币格式化工具函数，负责将数值转换为带货币符号的字符串
- **Editor_Component**: 左侧编辑面板，提供表单输入界面
- **Teacher_Card_Editor**: 教师卡专属编辑区域，提供照片上传、大学选择、部门选择等功能
- **State_Persistence_Manager**: 状态持久化管理器，负责将应用状态保存到 localStorage 并恢复
- **Form_Validator**: 表单验证模块，负责校验用户输入的合法性
- **Export_Manager**: 文档导出管理器，负责 PDF、PNG、ZIP 导出功能
- **Photo_Uploader**: 照片上传组件，支持本地文件上传和远程获取

## 需求

### 需求 1：Preview 组件拆分

**用户故事：** 作为开发者，我希望将 1018 行的 Preview.jsx 巨型组件拆分为独立的文档渲染组件，以便提高代码可维护性和可测试性。

#### 验收标准

1. THE Preview_Component SHALL 将每种文档类型的渲染逻辑委托给独立的 Document_Renderer 组件
2. WHEN 选择不同文档类型时，THE Preview_Component SHALL 加载对应的 Document_Renderer 组件进行渲染
3. THE Document_Renderer SHALL 包含以下独立组件：PayslipRenderer、InvoiceRenderer、TaxFormRenderer、W2Renderer、EmploymentLetterRenderer、OfferLetterRenderer、FacultyListingRenderer、TeacherCardRenderer
4. WHEN 拆分完成后，THE Preview_Component SHALL 保持与拆分前完全一致的视觉渲染效果
5. THE Document_Renderer SHALL 通过 props 接收所需的状态数据，不直接访问全局状态

### 需求 2：统一货币格式

**用户故事：** 作为用户，我希望所有文档中的货币格式统一为美元（USD），以便数据展示一致且准确。

#### 验收标准

1. THE Currency_Formatter SHALL 使用 `en-US` 区域设置和 `USD` 货币代码格式化所有金额
2. WHEN 格式化金额时，THE Currency_Formatter SHALL 输出以 `$` 符号开头、包含千位分隔符和两位小数的字符串
3. WHEN 传入非数值参数时，THE Currency_Formatter SHALL 将其视为 0 并返回 `$0.00`
4. THE Preview_Component SHALL 在所有文档类型中统一使用 Currency_Formatter 格式化金额，消除直接使用 `toLocaleString` 的硬编码格式化

### 需求 3：教师卡功能完善

**用户故事：** 作为用户，我希望能够完整编辑教师卡的所有字段，以便生成准确的教师身份证件。

#### 验收标准

1. WHEN 选择教师卡文档类型时，THE Editor_Component SHALL 显示 Teacher_Card_Editor 专属编辑区域
2. THE Teacher_Card_Editor SHALL 提供大学名称下拉选择框，允许用户从预设列表中选择或手动输入大学名称
3. THE Teacher_Card_Editor SHALL 提供部门名称下拉选择框，根据所选大学动态加载可选部门列表
4. THE Teacher_Card_Editor SHALL 提供紧急联系电话输入框，替代硬编码的 `(555) 123-4567`
5. THE Teacher_Card_Editor SHALL 提供办公室号码输入框，替代硬编码的 `Room 204`
6. THE Teacher_Card_Editor SHALL 提供服务年限输入框，替代基于哈希值的自动计算
7. THE Teacher_Card_Editor SHALL 提供有效期输入框，替代固定的 +4 年计算
8. WHEN 用户修改教师卡编辑字段时，THE TeacherCardRenderer SHALL 实时反映修改内容

### 需求 4：照片上传功能

**用户故事：** 作为用户，我希望能够手动上传照片作为主要方案，同时保留远程获取作为备选，以便不依赖外部服务。

#### 验收标准

1. THE Photo_Uploader SHALL 提供文件选择按钮，允许用户从本地上传 JPEG 或 PNG 格式的照片
2. WHEN 用户选择本地照片文件时，THE Photo_Uploader SHALL 将照片转换为 Base64 格式并更新预览
3. WHEN 用户点击随机按钮时，THE Photo_Uploader SHALL 从远程服务获取随机照片作为备选方案
4. IF 远程照片获取失败，THEN THE Photo_Uploader SHALL 显示默认占位头像而非报错
5. THE Photo_Uploader SHALL 对上传的照片进行基本尺寸验证，接受宽高均不超过 4096 像素的图片

### 需求 5：数据持久化

**用户故事：** 作为用户，我希望编辑的数据在页面刷新后不丢失，以便不必重复输入。

#### 验收标准

1. WHEN 用户修改任何表单字段时，THE State_Persistence_Manager SHALL 在 500 毫秒防抖延迟后将完整应用状态保存到 localStorage
2. WHEN 应用启动时，THE State_Persistence_Manager SHALL 从 localStorage 读取已保存的状态并恢复
3. IF localStorage 中无已保存状态，THEN THE State_Persistence_Manager SHALL 使用 INITIAL_STATE 作为默认值
4. IF localStorage 中的数据格式损坏或解析失败，THEN THE State_Persistence_Manager SHALL 清除损坏数据并回退到 INITIAL_STATE
5. THE State_Persistence_Manager SHALL 提供"重置为默认值"按钮，允许用户清除已保存的状态
6. THE State_Persistence_Manager SHALL 对状态进行 JSON 序列化和反序列化以实现持久化
7. FOR ALL 有效的应用状态对象，序列化后再反序列化 SHALL 产生等价的状态对象（往返一致性）

### 需求 6：表单验证

**用户故事：** 作为用户，我希望数字字段只接受有效数字输入，以便避免生成错误的文档。

#### 验收标准

1. WHEN 用户在数字类型字段中输入值时，THE Form_Validator SHALL 将输入值转换为数值类型
2. WHEN 用户在数字字段中输入非数值字符串时，THE Form_Validator SHALL 阻止无效输入并保持字段当前值不变
3. WHEN 金额字段的值为负数时，THE Form_Validator SHALL 显示视觉警告提示
4. THE Form_Validator SHALL 对必填字段（员工姓名、公司名称）进行非空验证
5. WHEN 必填字段为空时，THE Form_Validator SHALL 在字段旁显示红色边框和提示文字

### 需求 7：导出功能改进

**用户故事：** 作为用户，我希望 ZIP 导出包含所有文档类型且导出过程稳定可靠，以便获得完整的文档包。

#### 验收标准

1. THE Export_Manager SHALL 在 ZIP 导出中包含所有 7 种文档类型（Payslip、Invoice、Tax Form、W-2、Employment Letter、Offer Letter、Faculty Listing）
2. THE Export_Manager SHALL 使用基于 Promise 的渲染等待机制替代 `setTimeout(500ms)` 的固定延迟
3. WHEN ZIP 导出进行中时，THE Export_Manager SHALL 显示进度指示器，告知用户当前正在导出的文档类型
4. IF 单个文档导出失败，THEN THE Export_Manager SHALL 跳过该文档并继续导出其余文档，最终报告失败的文档列表
5. WHEN 导出完成后，THE Export_Manager SHALL 将文档类型切换回用户导出前选择的类型

### 需求 8：测试修复与更新

**用户故事：** 作为开发者，我希望所有测试与实际代码保持同步且能通过，以便保证代码质量。

#### 验收标准

1. THE App_Test SHALL 更新所有断言以匹配 initialState.js 中的实际默认值（如公司名 `Wayne Hills High School`）
2. THE App_Test SHALL 为每种文档类型的渲染添加基本渲染测试
3. THE Calculations_Test SHALL 覆盖 Currency_Formatter 的格式化逻辑，包括正数、零、负数和非数值输入
4. WHEN 运行 `vitest --run` 时，THE Test_Suite SHALL 全部通过且无失败用例

### 需求 9：无障碍改进

**用户故事：** 作为使用辅助技术的用户，我希望应用具备基本的无障碍支持，以便能够正常使用。

#### 验收标准

1. THE Editor_Component SHALL 为所有 `<input>` 元素关联 `<label>` 的 `htmlFor` 属性与 `<input>` 的 `id` 属性
2. THE Preview_Component SHALL 为缩放按钮添加 `aria-label` 属性（如 "放大"、"缩小"）
3. THE Editor_Component SHALL 为所有操作按钮（添加、删除、上传）添加描述性的 `aria-label` 属性
4. THE Navigation_Bar SHALL 为文档类型切换按钮添加 `aria-current` 属性标识当前选中状态

### 需求 10：提取可复用文档渲染子组件

**用户故事：** 作为开发者，我希望提取多个文档类型中重复的渲染模式为共享子组件，以便减少代码重复。

#### 验收标准

1. THE Document_Renderer SHALL 提取共享的文档头部渲染逻辑为 DocumentHeader 子组件
2. THE Document_Renderer SHALL 提取共享的数据表格渲染逻辑为 DataTable 子组件
3. THE Document_Renderer SHALL 提取共享的信息行渲染逻辑为 InfoRow 子组件
4. WHEN 使用共享子组件重构后，THE Document_Renderer SHALL 保持与重构前完全一致的视觉渲染效果
