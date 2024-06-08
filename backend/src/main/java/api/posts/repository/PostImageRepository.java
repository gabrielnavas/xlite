package api.posts.repository;

import api.posts.models.PostImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PostImageRepository extends JpaRepository<PostImage, UUID> {
    void deleteAllByPostId(UUID postId);
}
