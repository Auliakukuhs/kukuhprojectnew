import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControlOptions, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {UserService, AlertService} from '@app/_services';
import {formatDate} from '@angular/common';

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  tax: any;
  taxableValue: string | undefined;
  model: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) {
  }

  formatCurrency_TaxableValue(event: any) {
    const uy = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(event.target.value);
    this.tax = event.target.value;
    this.taxableValue = uy;
  }
  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;
    console.log(this.id, this.isAddMode);
    this.form = this.formBuilder.group({
      group: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      description: ['', Validators.required],
      username: ['', Validators.required],
      status: ['', Validators.required],
      basicSalary: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    if (!this.isAddMode) {
      this.userService.getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.form.patchValue(x);
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('User added', {keepAfterRouteChange: true});
        this.router.navigate(['../'], {relativeTo: this.route});
      })
      .add(() => this.loading = false);
  }

  private updateUser() {
    this.userService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe(() => {
        this.alertService.success('User updated', {keepAfterRouteChange: true});
        this.router.navigate(['../../'], {relativeTo: this.route});
      })
      .add(() => this.loading = false);
  }
}
