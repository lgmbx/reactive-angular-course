import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from "rxjs/operators";
import { MessageService } from "../messages/message.service";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { LoadingService } from "./loading.service";

@Injectable({ providedIn: "root" })
export class CourseStore {
  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private messages: MessageService
  ) {
    this.loadAllCourses();
  }

  private subject$ = new BehaviorSubject<Course[]>([]);
  courses$: Observable<Course[]> = this.subject$.asObservable();

  private loadAllCourses() {
    const loadedCourses = this.http.get<Course[]>("/api/courses").pipe(
      map((data) => data["payload"]),
      catchError((err) => {
        const message = "could not load all courses";
        this.messages.showErrors(message);
        return throwError(err);
      }),
      tap((courses) => this.subject$.next(courses))
    );

    this.loading.showLoaderUntilCompleted(loadedCourses).subscribe();
  }

  saveCourse(courseId: string, changes: Partial<Course>): Observable<any> {
    const firstVersionCourses = this.subject$.getValue();
    const index = firstVersionCourses.findIndex(
      (course) => course.id === courseId
    );

    const newCourse: Course = {
      ...firstVersionCourses[index],
      ...changes,
    };

    const newListCourses: Course[] = firstVersionCourses.slice(0);
    newListCourses[index] = newCourse;
    this.subject$.next(newListCourses);

    return this.http
      .put("/api/courses/${courseId}", changes)
      .pipe(
        catchError((err) => {
          const message = 'Could not save course';
          this.messages.showErrors(message);
          this.subject$.next(firstVersionCourses);
          return throwError(err);
        }),
        shareReplay()
      );
  }

  filterByCategory(category: string): Observable<Course[]> {
    return this.courses$.pipe(
      map((course) =>
        course
          .filter((cour) => cour.category == category)
          .sort(sortCoursesBySeqNo)
      )
    );
  }
}
