import {
  switchMap,
  concatMap,
  map,
  interval,
  take,
  catchError,
  EMPTY,
} from "rxjs";
import { ajax } from "rxjs/ajax";

export default class Stream {
  create() {
    const stream$ = interval().pipe(
      take(5),
      concatMap(() => {
        return ajax(
          "https://posts-with-comments-backend.vercel.app/posts/latest"
        ).pipe(
          map(({ response }) => {
            const posts = response.data;
            return posts;
          }),
          switchMap((posts) => {
            const post = posts[0];
            return ajax(
              `https://posts-with-comments-backend.vercel.app/posts/${post.id}/comments/latest`
            ).pipe(
              map(({ response }) => {
                return {
                  post,
                  comments: response.data,
                };
              }),
              catchError(() => EMPTY)
            );
          })
        );
      })
    );

    return stream$;
  }
}
