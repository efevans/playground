import { Form as RRForm } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const PostForm = () => {
  return (
    <div id="user-post">
      <Form id="login" tag={RRForm} method="post">
        <FormGroup>
          <Label for="user-post">Email</Label>
          <Input
            id="user-post"
            name="content"
            placeholder="I did this thing today..."
            type="textarea"
            className="user-post"
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
