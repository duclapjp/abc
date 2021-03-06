import React from "react";
import Mention from "@iso/components/uielements/mention";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import PageHeader from "@iso/components/utility/pageHeader";
import ContentHolder from "@iso/components/utility/contentHolder";

const Nav = Mention.Nav;

const webFrameworks = [
  {
    name: "React",
    type: "JavaScript",
    icon: "https://zos.alipayobjects.com/rmsportal/LFIeMPzdLcLnEUe.svg",
  },
  {
    name: "Angular",
    type: "JavaScript",
    icon: "https://zos.alipayobjects.com/rmsportal/PJTbxSvzYWjDZnJ.png",
  },
  {
    name: "Dva",
    type: "Javascript",
    icon: "https://zos.alipayobjects.com/rmsportal/EYPwSeEJKxDtVxI.png",
  },
  {
    name: "Flask",
    type: "Python",
    icon: "https://zos.alipayobjects.com/rmsportal/xaypBUijfnpAlXE.png",
  },
];

export default function () {
  const [suggestions, setSuggestions] = React.useState([]);

  const onSearchChange = (value) => {
    const searchValue = value.toLowerCase();
    const filtered = webFrameworks.filter(
      (item) => item.name.toLowerCase().indexOf(searchValue) !== -1
    );
    const suggestions = filtered.map((suggestion, index) => (
      <Nav
        value={suggestion.name}
        data={suggestion}
        disabled={suggestion.disabled}
        key={index}
      >
        <span>
          <img
            alt={suggestion.name}
            style={{ height: 16, width: 16, marginRight: 5, float: "left" }}
            src={suggestion.icon}
          />
          {suggestion.name} - {suggestion.type}
        </span>
      </Nav>
    ));
    setSuggestions(suggestions);
  };

  return (
    <LayoutWrapper>
      <PageHeader>Mention</PageHeader>

      <div className="isoBoxWrapper">
        <h3>Customize suggestion</h3>
        <p>Customize suggestions.</p>

        <ContentHolder>
          <Mention
            style={{ width: "100%", height: 100 }}
            suggestions={suggestions}
            onSearchChange={onSearchChange}
          />
        </ContentHolder>
      </div>
    </LayoutWrapper>
  );
}
