import { forwardRef } from "react";

import Form from "./Form";
import { Data, UpdateForm } from "./types";

type BoxInsideProps = {
  data: Data;
  onFinishUpdate: (data: UpdateForm) => void;
};

const ModalContent = forwardRef<HTMLDivElement, BoxInsideProps>(({ data, onFinishUpdate }, ref) => {
  return (
    <div ref={ref}>
      <Form
        data={data}
        onFinishUpdate={onFinishUpdate}
      />
    </div>
  );
});

export default ModalContent;