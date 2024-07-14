import type { BuiltInNode, Node, NodeTypes } from "@xyflow/react";
import PositionLoggerNode, {
    type PositionLoggerNode as PositionLoggerNodeType,
} from "./PositionLoggerNode";

import AssessmentBeginNode, {
    type AssessmentBeginNode as AssessmentBeginNodeType,
} from "./AssessmentBeginNode";

import AssessmentCompleteNode, {
    type AssessmentCompleteNode as AssessmentCompleteNodeType,
} from "./AssessmentCompleteNode";

import TrueFalseQuestionNode, {
    type TrueFalseQuestionNode as TrueFalseQuestionNodeType,
} from "./TrueFalseQuestion";

export const nodeTypes = {
    "position-logger": PositionLoggerNode,
    "assessment-begin": AssessmentBeginNode,
    "assessment-complete": AssessmentCompleteNode,
    "true-false-question": TrueFalseQuestionNode,
    // Add any of your custom nodes here!
} satisfies NodeTypes;

// Append the types of you custom edges to the BuiltInNode type
export type CustomNodeType = BuiltInNode | PositionLoggerNodeType | AssessmentCompleteNodeType | TrueFalseQuestionNodeType;