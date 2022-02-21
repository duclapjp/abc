import { lazy } from "react";

const templateRoutes = [
  {
    path: "blank_page",
    component: lazy(() => import("@iso/containers/BlankPage/BlankPage")),
  },
  {
    path: "inbox",
    component: lazy(() => import("@iso/containers/template-containers/Mail/Mail")),
  },
  {
    path: "my-profile",
    component: lazy(() =>
      import("@iso/containers/template-containers/Profile/Profile")
    ),
  },
  {
    path: "quiz/:quizid",
    component: lazy(() =>
      import("@iso/containers/template-containers/Quiz/SingleQuiz")
    ),
  },
  // {
  //   path: 'quiz',
  //   component: lazy(() => import('@iso/containers/template-containers/Quiz/Quiz')),
  // },
  {
    path: "swiperslider",
    component: lazy(() =>
      import(
        "@iso/containers/template-containers/UIElements/SwiperSlider/SwiperSlider"
      )
    ),
  },
  {
    path: "scrum-board",
    component: lazy(() => import("@iso/containers/template-containers/ScrumBoard")),
    exact: false,
  },
  {
    path: "mailbox",
    component: lazy(() => import("@iso/containers/template-containers/Mail/Mail")),
  },
  {
    path: "calendar",
    component: lazy(() =>
      import("@iso/containers/template-containers/Calendar/Calendar")
    ),
  },
  {
    path: "googlemap",
    component: lazy(() =>
      import("@iso/containers/template-containers/Map/GoogleMap/GoogleMap")
    ),
  },
  {
    path: "leafletmap",
    component: lazy(() =>
      import("@iso/containers/template-containers/Map/Leaflet/Leaflet")
    ),
  },
  {
    path: "table_ant",
    component: lazy(() =>
      import("@iso/containers/template-containers/Tables/AntTables/AntTables")
    ),
  },
  {
    path: "allFormComponent",
    component: lazy(() => import("@iso/containers/template-containers/Forms/Forms")),
  },
  {
    path: "InputField",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Input/Input")
    ),
  },
  {
    path: "editor",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Editor/Editor")
    ),
  },
  {
    path: "stepperForms",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/StepperForms/StepperForms")
    ),
  },
  {
    path: "FormsWithValidation",
    component: lazy(() =>
      import(
        "@iso/containers/template-containers/Forms/FormsWithValidation/FormsWithValidation"
      )
    ),
  },
  {
    path: "progress",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Progress/Progress")
    ),
  },
  {
    path: "button",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Button/Button")
    ),
  },
  {
    path: "tab",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Tab/Tab")
    ),
  },
  {
    path: "autocomplete",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/AutoComplete/AutoComplete")
    ),
  },
  {
    path: "checkbox",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Checkbox/Checkbox")
    ),
  },
  {
    path: "radiobox",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Radiobox/Radiobox")
    ),
  },
  {
    path: "selectbox",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Select/Select")
    ),
  },
  {
    path: "transfer",
    component: lazy(() =>
      import("@iso/containers/template-containers/Forms/Transfer/Transfer")
    ),
  },
  {
    path: "gridLayout",
    component: lazy(() =>
      import("@iso/containers/template-containers/Box/GridLayout")
    ),
  },
  {
    path: "notes",
    component: lazy(() => import("@iso/containers/template-containers/Note/Note")),
  },
  {
    path: "todo",
    component: lazy(() => import("@iso/containers/template-containers/Todo/Todo")),
  },
  {
    path: "articles",
    component: lazy(() =>
      import("@iso/containers/template-containers/FirestoreCRUD/Article/Article")
    ),
  },
  {
    path: "investors",
    component: lazy(() =>
      import("@iso/containers/template-containers/FirestoreCRUD/Investor/Investor")
    ),
  },
  {
    path: "contacts",
    component: lazy(() =>
      import("@iso/containers/template-containers/Contacts/Contacts")
    ),
  },
  {
    path: "alert",
    component: lazy(() =>
      import("@iso/containers/template-containers/Feedback/Alert/Alert")
    ),
  },
  {
    path: "modal",
    component: lazy(() =>
      import("@iso/containers/template-containers/Feedback/Modal/Modal")
    ),
  },
  {
    path: "message",
    component: lazy(() =>
      import("@iso/containers/template-containers/Feedback/Message/Message")
    ),
  },
  {
    path: "notification",
    component: lazy(() =>
      import(
        "@iso/containers/template-containers/Feedback/Notification/Notification"
      )
    ),
  },
  {
    path: "Popconfirm",
    component: lazy(() =>
      import("@iso/containers/template-containers/Feedback/Popconfirm/Popconfirm")
    ),
  },
  {
    path: "spin",
    component: lazy(() =>
      import("@iso/containers/template-containers/Feedback/Spin/Spin")
    ),
  },
  {
    path: "shuffle",
    component: lazy(() =>
      import("@iso/containers/template-containers/Shuffle/Shuffle")
    ),
  },
  {
    path: "affix",
    component: lazy(() =>
      import("@iso/containers/template-containers/Navigation/Affix")
    ),
  },
  {
    path: "breadcrumb",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Breadcrumb/Breadcrumb")
    ),
  },
  {
    path: "backToTop",
    component: lazy(() =>
      import("@iso/containers/template-containers/Navigation/BackToTop")
    ),
  },
  {
    path: "dropdown",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Dropdown/Dropdown")
    ),
  },
  {
    path: "op_badge",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Badge/Badge")
    ),
  },
  {
    path: "op_card",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Card/Card")
    ),
  },
  {
    path: "op_carousel",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Carousel/Carousel")
    ),
  },
  {
    path: "op_collapse",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Collapse/Collapse")
    ),
  },
  {
    path: "op_tooltip",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Tooltip/Tooltip")
    ),
  },
  {
    path: "rating",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Rating/Rating")
    ),
  },
  {
    path: "tree",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Tree/Tree")
    ),
  },
  {
    path: "op_tag",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Tag/Tag")
    ),
  },
  {
    path: "op_timeline",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Timeline/Timeline")
    ),
  },
  {
    path: "pagination",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Pagination/Pagination")
    ),
  },
  {
    path: "op_popover",
    component: lazy(() =>
      import("@iso/containers/template-containers/UIElements/Popover/Popover")
    ),
  },
  {
    path: "googleChart",
    component: lazy(() =>
      import("@iso/containers/template-containers/Charts/GoogleChart/GoogleChart")
    ),
  },
  {
    path: "reecharts",
    component: lazy(() =>
      import("@iso/containers/template-containers/Charts/Recharts/Recharts")
    ),
  },
  {
    path: "menu",
    component: lazy(() =>
      import("@iso/containers/template-containers/Navigation/NavigationMenu")
    ),
  },
  {
    path: "ReactChart2",
    component: lazy(() =>
      import("@iso/containers/template-containers/Charts/ReactChart2/ReactChart2")
    ),
  },
  {
    path: "card",
    component: lazy(() =>
      import("@iso/containers/template-containers/Ecommerce/Card/Card")
    ),
  },
  {
    path: "cart",
    component: lazy(() =>
      import("@iso/containers/template-containers/Ecommerce/Cart/Cart")
    ),
  },
  {
    path: "checkout",
    component: lazy(() =>
      import("@iso/containers/template-containers/Ecommerce/Checkout/Checkout")
    ),
  },
  {
    path: "shop",
    component: lazy(() =>
      import("@iso/containers/template-containers/Ecommerce/Algolia/InstantSearch")
    ),
  },
  {
    path: "reactDates",
    component: lazy(() =>
      import("@iso/containers/template-containers/AdvancedUI/ReactDates/ReactDates")
    ),
  },
  {
    path: "codeMirror",
    component: lazy(() =>
      import("@iso/containers/template-containers/AdvancedUI/CodeMirror/CodeMirror")
    ),
  },
  {
    path: "uppy",
    component: lazy(() =>
      import("@iso/containers/template-containers/AdvancedUI/Uppy/Uppy")
    ),
  },
  {
    path: "dropzone",
    component: lazy(() =>
      import("@iso/containers/template-containers/AdvancedUI/Dropzone/Dropzone")
    ),
  },
  {
    path: "youtubeSearch",
    component: lazy(() =>
      import("@iso/containers/template-containers/YoutubeSearch/YoutubeSearch")
    ),
  },
  {
    path: "frappeChart",
    component: lazy(() =>
      import("@iso/containers/template-containers/Charts/FrappeChart/FrappeChart")
    ),
  },
  {
    path: "invoice/:invoiceId",
    component: lazy(() =>
      import("@iso/containers/template-containers/Invoice/SingleInvoice")
    ),
  },
  {
    path: "invoice",
    component: lazy(() =>
      import("@iso/containers/template-containers/Invoice/Invoices")
    ),
  },
  {
    path: "chat",
    component: lazy(() => import("@iso/containers/template-containers/Chat/Chat")),
  },

  {
    path: "githubSearch",
    component: lazy(() =>
      import("@iso/containers/template-containers/GithubSearch/GithubSearch")
    ),
  },
];

export default templateRoutes;
