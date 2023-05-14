import { Form as RRForm } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const PostForm = () => {
  return (
    <div>
      <Form id="login" tag={RRForm} method="post">
        <FormGroup>
          <Label for="post">Email</Label>
          <Input
            id="post"
            name="content"
            placeholder="I did this thing today..."
            type="textarea"
            style={{
              resize: "vertical",
              maxHeight: "12rem",
              minHeight: "6rem",
            }}
          />
        </FormGroup>
        <Button>Post</Button>
      </Form>
    </div>
  );
};

export default PostForm;
