import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Course } from "../model/course";
import { CourseStore } from "../services/course.store";
import { LoadingService } from "../services/loading.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courseStores: CourseStore,
    private loading: LoadingService

  ) {}

  ngOnInit() {
    this.loading.addCounter()
    this.reloadAllCourses();
  }

  reloadAllCourses() {
    this.beginnerCourses$ = this.courseStores.filterByCategory("BEGINNER");
    this.advancedCourses$ = this.courseStores.filterByCategory("ADVANCED");
  }
}
