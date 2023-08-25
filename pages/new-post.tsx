import StandardLayout from "@/src/components/commons/standardLayout";
import PostForm from "@/src/components/newPost";

export default function NewPost() {
  return (
    <StandardLayout
      pageTitle="Nerdolar - Nova Postagem"
      mainContent={<PostForm />}
    />
  );
}
