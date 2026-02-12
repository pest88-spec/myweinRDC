# 需求文档

## 简介

为现有的 Payslip Generator React 应用新增"教育工作者执照"（Educator License）证书文档类型。该证书以美国俄亥俄州教育部颁发的教师执照为原型，包含装饰性边框、哥特式标题、执照信息、教学领域/背书列表、续期要求及签名栏等元素。新文档类型需遵循项目现有的架构模式（initialState → Editor → Preview → Renderer），并支持 PDF/PNG 导出和随机数据生成。

## 术语表

- **App**: 基于 React + Vite 构建的 Payslip Generator 应用程序
- **Renderer**: 位于 `src/components/renderers/` 目录下的独立文档渲染组件
- **Editor**: 左侧面板表单编辑组件，根据 `docType` 条件渲染对应的编辑区域
- **Preview**: 右侧预览面板组件，根据 `docType` 路由到对应的 Renderer
- **InitialState**: `src/constants/initialState.js` 中定义的应用默认状态对象
- **Educator_License**: 教育工作者执照证书文档类型，模拟美国州级教育部门颁发的教师执照
- **Teaching_Area**: 执照持有人被授权教授的学科或服务领域（如 "Intervention Specialist (K-12)"）
- **Endorsement**: 执照上列出的具体教学资质背书（如 "Mild/Moderate"、"Moderate/Intensive"）
- **License_Number**: 执照的唯一编号（如 "OH1418511"）
- **Certificate_Number**: 证书底部显示的证书编号
- **Signatory**: 证书上的签名人（如公共教育总监、副总监）

## 需求

### 需求 1：教育工作者执照状态数据

**用户故事：** 作为用户，我希望应用能存储教育工作者执照的所有字段数据，以便我可以编辑并生成完整的执照证书。

#### 验收标准

1. THE InitialState SHALL include an `educatorLicense` section containing fields for state name, department name, license type, licensee full name, license number, issue date, valid-from date, valid-to date, teaching areas list, renewal requirements, certificate number, and two signatory entries (name and title for each)
2. WHEN the App initializes, THE InitialState SHALL provide sensible default values for all Educator_License fields that produce a visually complete certificate
3. WHEN the `generateRandomData` utility is invoked, THE App SHALL produce randomized but realistic Educator_License field values including a random state name, license type, license number, date range, teaching areas, and signatory names

### 需求 2：教育工作者执照编辑器

**用户故事：** 作为用户，我希望在选择"Educator License"文档类型时看到对应的编辑表单，以便我可以自定义执照证书的所有字段。

#### 验收标准

1. WHEN the docType is set to `educatorLicense`, THE Editor SHALL display a dedicated form section for editing all Educator_License fields
2. WHEN the docType is not `educatorLicense`, THE Editor SHALL hide the Educator_License form section
3. THE Editor SHALL provide input controls for each Educator_License field: text inputs for names, numbers, and text; date inputs for dates; and a dynamic list for Teaching_Area entries
4. WHEN a user adds a Teaching_Area entry, THE Editor SHALL append a new editable item to the teaching areas list
5. WHEN a user removes a Teaching_Area entry, THE Editor SHALL remove the specified item from the teaching areas list

### 需求 3：教育工作者执照渲染器

**用户故事：** 作为用户，我希望在预览面板中看到一个视觉上还原俄亥俄州教师执照样式的证书，以便我可以生成逼真的执照文档。

#### 验收标准

1. THE Renderer SHALL display a decorative border around the entire certificate
2. THE Renderer SHALL display the state name in an ornate gothic-style font as the primary header, with the department name below it
3. THE Renderer SHALL display the license type as a subtitle below the department name
4. THE Renderer SHALL display the licensee full name in bold uppercase text
5. THE Renderer SHALL display the License_Number, issue date, and valid period (from-to dates) in a structured layout
6. THE Renderer SHALL display the standard authorization body text describing the holder's credentials
7. THE Renderer SHALL display all Teaching_Area entries as a list of authorized subjects or service areas
8. WHEN Endorsement entries exist within a Teaching_Area, THE Renderer SHALL display the endorsements indented below the corresponding teaching area
9. THE Renderer SHALL display the renewal requirements text
10. THE Renderer SHALL display the Certificate_Number in red text at the bottom center of the certificate
11. THE Renderer SHALL display two Signatory lines at the bottom with name and title for each

### 需求 4：应用导航集成

**用户故事：** 作为用户，我希望在导航栏中看到"Educator License"按钮，以便我可以切换到该文档类型。

#### 验收标准

1. THE App SHALL include an "Educator License" navigation button in the document type navigation bar
2. WHEN the user clicks the "Educator License" navigation button, THE App SHALL set the docType to `educatorLicense` and display the corresponding Renderer in the Preview panel
3. WHEN the docType is `educatorLicense`, THE App navigation button SHALL display an active visual state with `aria-current="page"` attribute

### 需求 5：预览路由集成

**用户故事：** 作为用户，我希望预览面板能正确路由到教育工作者执照渲染器，以便我可以实时预览证书效果。

#### 验收标准

1. WHEN the docType is `educatorLicense`, THE Preview SHALL render the EducatorLicenseRenderer component
2. THE Preview SHALL pass the current application state to the EducatorLicenseRenderer

### 需求 6：PDF 和 PNG 导出支持

**用户故事：** 作为用户，我希望能将教育工作者执照导出为 PDF 和 PNG 格式，以便我可以保存或打印证书。

#### 验收标准

1. WHEN the docType is `educatorLicense` and the user clicks the PDF export button, THE App SHALL generate a PDF file containing the rendered certificate
2. WHEN the docType is `educatorLicense` and the user clicks the PNG export button, THE App SHALL generate a PNG image of the rendered certificate
3. WHEN exporting all documents to ZIP, THE App SHALL include the Educator_License document in the exported archive

### 需求 7：渲染器数据完整性

**用户故事：** 作为开发者，我希望渲染器能正确地将所有状态字段映射到证书的视觉元素上，以便确保数据展示的准确性。

#### 验收标准

1. FOR ALL valid Educator_License state objects, THE Renderer SHALL display every non-empty field value somewhere in the rendered output
2. WHEN any Educator_License field value changes in the state, THE Renderer SHALL reflect the updated value in the rendered certificate
3. IF a Teaching_Area list is empty, THEN THE Renderer SHALL display the certificate without the teaching areas section while maintaining valid layout
