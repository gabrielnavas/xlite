package api.posts.repository;

import api.posts.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface PostRepository extends JpaRepository<Post, UUID> {
    List<Post> findByOwnerIdOrderByCreatedAtDesc(String id);
    List<Post> findAllByOrderByCreatedAtDesc();
}
