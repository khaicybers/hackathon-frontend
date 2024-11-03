import React, { useState } from "react";
import TableSuggest from "../components/TableSuggest";
import styled from "styled-components";
import SelectOption from "../components/Select";

const StyledSuggestPage = styled.div`
  padding: 100px 0 0 0;
  display: flex;
  flex-direction: column;
  min-height: 85vh;
`;

function SuggestPage() {
  const [university, setUniversity] = useState([]);
  return (
    <StyledSuggestPage>
      <SelectOption university={university} setUniversity={setUniversity} />
      <TableSuggest data={university} responsive={["sm", "md"]} />
    </StyledSuggestPage>
  );
}

export default SuggestPage;
