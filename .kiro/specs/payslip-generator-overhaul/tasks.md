# 实现计划：Payslip Generator 全面优化

## 概述

基于审计结果和设计文档，按照依赖关系和优先级分阶段实施。先修复基础工具函数，再拆分组件，最后添加新功能。每个任务构建在前一个任务之上，确保增量可验证。

## 任务

- [x] 1. 统一货币格式化并修复计算工具
  - [x] 1.1 修改 `src/utils/calculations.js` 中的 `formatCurrency` 函数，将 `en-AU` + `AUD` 改为 `en-US` + `USD`，添加非数值输入处理（转为 0）
    - _Requirements: 2.1, 2.2, 2.3_
  - [x]* 1.2 为 `formatCurrency` 编写属性测试
    - 安装 fast-check 依赖：`npm install --save-dev fast-check`
    - **Property 1: 货币格式一致性** — 对所有数值，输出匹配 `$X,XXX.XX` 格式
    - **Property 2: 非数值货币处理** — 对所有非数值输入，输出 `$0.00`
    - **Validates: Requirements 2.1, 2.2, 2.3**
  - [x]* 1.3 更新 `src/utils/calculations.test.js`，修复现有测试并添加 `formatCurrency` 的具体值单元测试
    - _Requirements: 8.3_

- [x] 2. 提取共享子组件
  - [x] 2.1 创建 `src/components/renderers/shared/DocumentHeader.jsx`，提取文档头部渲染逻辑（公司名、logo、地址）
    - 支持 centered 和 left-aligned 两种布局
    - _Requirements: 10.1_
  - [x] 2.2 创建 `src/components/renderers/shared/DataTable.jsx`，提取数据表格渲染逻辑
    - 支持可配置列、对齐方式、表头、表尾
    - _Requirements: 10.2_
  - [x] 2.3 创建 `src/components/renderers/shared/InfoRow.jsx`，提取信息行渲染逻辑
    - _Requirements: 10.3_

- [x] 3. 拆分 Preview.jsx 为独立文档渲染组件
  - [x] 3.1 创建 `src/components/renderers/PayslipRenderer.jsx`，从 Preview.jsx 提取 `renderPayslip()` 逻辑，使用共享子组件，统一使用 `formatCurrency` 替代所有 `toLocaleString` 和 `$` 硬编码
    - _Requirements: 1.1, 1.2, 1.4, 2.4_
  - [x] 3.2 创建 `src/components/renderers/InvoiceRenderer.jsx`，提取 `renderInvoice()` 逻辑
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 3.3 创建 `src/components/renderers/TaxFormRenderer.jsx`，提取 `renderTaxForm()` 逻辑
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 3.4 创建 `src/components/renderers/W2Renderer.jsx`，提取 `renderW2()` 逻辑
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 3.5 创建 `src/components/renderers/EmploymentLetterRenderer.jsx`，提取 `renderEmploymentLetter()` 逻辑
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 3.6 创建 `src/components/renderers/OfferLetterRenderer.jsx`，提取 `renderOfferLetter()` 逻辑
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 3.7 创建 `src/components/renderers/FacultyListingRenderer.jsx`，提取 `renderFacultyListing()` 逻辑
    - _Requirements: 1.1, 1.2, 1.4_
  - [x] 3.8 创建 `src/components/renderers/TeacherCardRenderer.jsx`，提取 `renderTeacherCard()` 逻辑，将硬编码值改为从 props/state 读取
    - _Requirements: 1.1, 1.2, 1.4, 3.8_
  - [x] 3.9 重写 `src/components/Preview.jsx`，移除所有内联渲染函数，改为导入并路由到各独立渲染组件，保留缩放/拖拽逻辑和无障碍属性（aria-label）
    - _Requirements: 1.1, 1.2, 1.5, 9.2_

- [x] 4. Checkpoint — 确保组件拆分后应用正常运行
  - 确保所有测试通过，如有问题请询问用户。

- [x] 5. 扩展状态模型和教师卡编辑功能
  - [x] 5.1 在 `src/constants/initialState.js` 中添加 `teacherCard` 状态字段（universityId、department、emergencyPhone、officeRoom、yearsOfService、validUntil）
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_
  - [x] 5.2 在 `src/components/Editor.jsx` 中添加教师卡专属编辑区域（接收 docType prop，当 docType === 'teacherCard' 时显示），包含大学下拉选择、部门动态下拉、紧急电话、办公室号码、服务年限、有效期输入框
    - 从 App.jsx 传递 docType prop 到 Editor
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_
  - [x] 5.3 更新 `TeacherCardRenderer.jsx`，从 `state.teacherCard` 读取用户编辑的值，仅在用户未设置时使用哈希计算作为回退
    - _Requirements: 3.8_
  - [x]* 5.4 为部门列表与大学匹配编写属性测试
    - **Property 3: 部门列表与大学匹配**
    - **Validates: Requirements 3.3**

- [x] 6. 照片上传功能
  - [x] 6.1 创建 `src/components/PhotoUploader.jsx`，实现本地文件上传（JPEG/PNG）、Base64 转换、尺寸验证（≤4096px）、随机获取按钮
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - [x] 6.2 在 Editor.jsx 中集成 PhotoUploader 组件，替代仅通过 Random 按钮获取照片的方式
    - _Requirements: 4.1_
  - [x]* 6.3 为照片尺寸验证编写属性测试
    - **Property 5: 照片尺寸验证**
    - **Validates: Requirements 4.5**

- [x] 7. 数据持久化
  - [x] 7.1 创建 `src/hooks/usePersistentState.js`，实现 localStorage 读写、500ms 防抖保存、损坏数据回退、重置功能
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_
  - [x] 7.2 在 App.jsx 中将 `useState(INITIAL_STATE)` 替换为 `usePersistentState(INITIAL_STATE)`，在导航栏添加"重置"按钮
    - _Requirements: 5.1, 5.2, 5.5_
  - [x]* 7.3 为状态序列化往返一致性编写属性测试
    - **Property 6: 状态序列化往返一致性**
    - **Validates: Requirements 5.2, 5.6, 5.7**

- [x] 8. 表单验证
  - [x] 8.1 增强 `src/components/InputGroup.jsx`，添加 `useId()` 生成唯一 ID、label htmlFor 关联、数字输入类型转换和非数值拒绝、必填字段验证、负数警告、错误状态样式
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 9.1_
  - [x] 8.2 在 `src/index.css` 中添加 `.input-error` 和 `.error-text` 样式
    - _Requirements: 6.5_
  - [x]* 8.3 为表单验证编写属性测试
    - **Property 7: 数字输入转换**
    - **Property 8: 非数字输入拒绝**
    - **Property 9: 负数金额警告**
    - **Property 10: 必填字段非空验证**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

- [x] 9. Checkpoint — 确保新功能正常工作
  - 确保所有测试通过，如有问题请询问用户。

- [x] 10. 导出功能改进
  - [x] 10.1 修改 `src/utils/pdfExport.js` 中的 `exportToZip`：添加 faculty 到导出列表、用 `requestAnimationFrame` 替代 `setTimeout(500)`、添加进度回调、添加错误容错（跳过失败文档）、导出后恢复原始文档类型
    - 需要从 App.jsx 传递当前 docType 和 onProgress 回调
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  - [x] 10.2 在 App.jsx 中更新 ZIP 导出按钮，传递当前 docType、添加导出进度状态和进度指示器 UI
    - _Requirements: 7.3_

- [x] 11. 无障碍改进
  - [x] 11.1 更新 `src/components/DynamicTable.jsx`，为删除按钮添加 `aria-label="Remove item"`，为添加按钮添加 `aria-label`
    - _Requirements: 9.3_
  - [x] 11.2 更新 App.jsx 导航栏，为当前选中的文档类型按钮添加 `aria-current="page"`
    - _Requirements: 9.4_

- [x] 12. 修复并更新测试
  - [x] 12.1 修复 `src/App.test.jsx`：将 `Example Company Pty Ltd` 改为 `Wayne Hills High School`，更新所有过时断言，添加各文档类型的基本渲染测试
    - _Requirements: 8.1, 8.2, 8.4_

- [x] 13. 最终 Checkpoint — 确保所有测试通过
  - 运行 `npx vitest --run` 确保所有测试通过，如有问题请询问用户。

## 备注

- 标记 `*` 的任务为可选任务，可跳过以加速 MVP
- 每个任务引用具体需求以确保可追溯性
- 属性测试使用 fast-check 库，每个属性至少运行 100 次迭代
- 单元测试验证具体示例和边界情况
- Checkpoint 任务确保增量验证
