import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Lesson } from '../model/lesson';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course;

  lessons: Lesson[] = [];

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute,
              private coursesService: CoursesService) {

  }

  ngOnInit() {

    this.course = this.route.snapshot.data['course'];

    this.loadLessonsPage();

  }

  ngAfterViewInit() {


  }

  private loadLessonsPage() {
    this.coursesService.findLessons(this.course.id, 'asc', 0, 3).pipe(
      tap(lessons => this.lessons = lessons),
      catchError(err => {
        console.log('Error loading lessons', err);
        alert('Error loading lessons');
        return throwError(err);
      })
    )
      .subscribe();
  }
}
