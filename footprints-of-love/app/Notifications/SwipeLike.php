<?php

namespace App\Notifications;

use App\Models\Swipe;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SwipeLike extends Notification implements ShouldQueue
{
    use Queueable;

    protected Swipe $swipe;
    protected bool $hasMatched;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Swipe $swipe, bool $hasMatched)
    {
        $this->swipe = $swipe;
        $this->hasMatched = $hasMatched;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'swipe_id' => $this->swipe->id,
            'user_id' => $this->swipe->user->id,
            'first_name' => $this->swipe->user->first_name,
            'profile_photo_location' => $this->swipe->user->profilePhoto?->location,
            'created_at' => $this->swipe->created_at,
            'type' => $this->broadcastType()
        ];
    }

    /**
     * Get the type of the notification being broadcast.
     *
     * @return string
     */
    public function broadcastType()
    {
        if ($this->hasMatched) {
            return 'notification.match';
        }

        return 'notification.like';
    }
}
