import React from "react";
import { Box, Container } from "@material-ui/core";
import s from "./Instruction.module.css";
import FirstInst from "../../component/instructions/firstInst/FirstInst";
import PartOne from "../../component/instructions/partOne/PartOne";
import PartTwo from "../../component/instructions/partTwo/PartTwo";
import PartThree from "../../component/instructions/partThree/PartThree";
import PartFour from "../../component/instructions/partFour/PartFour";

export default function Instruction() {
  return (
    <div className={s.root}>
      <Container maxWidth="md">
        <FirstInst />
        <PartOne />
        <PartTwo />
        <PartThree />
        <PartFour />
      </Container>
    </div>
  );
}
